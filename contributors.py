import http.client
import json
import os
import subprocess as sp
import sys

EXCEPT_COMMIT_ID = []

GH_API_HOST = "api.github.com"

I18N_PREFIX = ['i18n/zh/docusaurus-plugin-content-docs/current']


def get_file_commits(file_path):
    pipe = sp.run(['git', 'log', '--no-merges', '--follow', '--pretty=format:%H %ae', '--numstat', file_path],
                  stdout=sp.PIPE)
    output = pipe.stdout.decode().replace('\r\n', '\n').split('\n\n')

    result = {}
    for i in output:
        i = i.split()
        if i[0] not in EXCEPT_COMMIT_ID and int(i[2]) + int(i[3]):
            result[i[0]] = int(i[2]) + int(i[3])

    return result


def get_commits(url, token):
    conn = http.client.HTTPSConnection(GH_API_HOST)
    if token:
        headers = {'Authorization': f'token {token}', 'User-Agent': 'Python'}
    else:
        headers = {'User-Agent': 'Python'}
    conn.request("GET", url, headers=headers)
    response = conn.getresponse()
    assert response.status // 100 == 2, f"request failed, {response.status}, {response.read()}"
    data = response.read()
    link_header = response.headers.get('Link')
    commits = json.loads(data.decode())

    return commits, link_header


def parse_link_header(link_header):
    if not link_header:
        return None
    links = link_header.split(',')
    for link in links:
        parts = link.split(';')
        if 'rel="next"' in parts[1]:
            next_url = parts[0].strip()[1:-1]  # remove < and >
            return next_url
    return None


def get_all_commits(repo, token=None):
    DELETE_FIELD = (
        'url', 'followers_url', 'following_url', 'gists_url', 'starred_url', 'subscriptions_url',
        'organizations_url', 'repos_url', 'events_url', 'received_events_url')

    url = f"/repos/{repo}/commits?per_page=100"
    result = {}
    while url:
        print("request:", url)
        commits, link_header = get_commits(url, token)
        for i in commits:
            for j in DELETE_FIELD:
                if i['author'] and i['author']['type'] == 'User':
                    del i['author'][j]
                if i['committer'] and i['committer']['type'] == 'User':
                    del i['committer'][j]
            result[i["sha"]] = {
                "author": i['author'],
                "committer": i['committer'],
                "html_url": i['html_url']
            }
        url = parse_link_header(link_header)

    return result


def get_all_file_commit(commits):
    result = {}
    for root, dirs, files in os.walk('docs'):
        for file in files:
            file_result = {}
            path = os.path.join(root, file)
            add_items(commits, file_result, path)
            for j in I18N_PREFIX:
                _path = path.replace('docs', j)
                add_items(commits, file_result, _path)

            file_result = [{'name': i, **file_result[i]} for i in file_result.keys()]
            result[path] = sorted(file_result, key=lambda x: - x['numbers'])
    return result


def add_items(commits, file_result, path):
    if not os.path.exists(path):
        return
    commit = get_file_commits(path)
    for i in commit.keys():
        if not commits.get(i):  # to skip the last commit when running at PR
            continue
        if not commits[i]['committer']:
            continue
        name = commits[i]['committer']['login']

        if name not in file_result:
            file_result[name] = {
                'avatar_url': commits[i]['committer']['avatar_url'],
                'html_url': commits[i]['committer']['html_url'],
                'numbers': commit[i]
            }
        else:
            file_result[name]['numbers'] += commit[i]


def main(repo, token):
    commits = get_all_commits(repo, token)
    result = get_all_file_commit(commits)
    with open("static/contributors.json", "w") as f:
        f.write(json.dumps(result, indent=4, ensure_ascii=True))


if __name__ == '__main__':
    print("run contributors.py")
    repo, token = sys.argv[1:]
    main(repo, token)
    print("run contributors.py success")
