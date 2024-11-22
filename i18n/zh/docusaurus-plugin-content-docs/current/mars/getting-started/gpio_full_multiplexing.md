---
sidebar_label: 'GPIO 引脚的全复用'
sidebar_position: 41
---

# GPIO 引脚的全复用

| Signal                     | Description                                         | Direction | Type       | Connect   |
|---------------------------|-----------------------------------------------------|-----------|------------|-----------|
| hifi4_jtag_tck            | The TAP clock signal for JTAG on HIFI4             | Input     | GPIO/Clock | sys_iomux |
| hifi4_jtag_tdi            | The TAP data input signal for JTAG on HIFI4        | Input     | GPIO       | sys_iomux |
| hifi4_jtag_tdo            | The TAP data output signal for JTAG on HIFI4       | Output    | GPIO       | sys_iomux |
| hifi4_jtag_tms            | The TAP mode switch signal for JTAG on HIFI4       | Input     | GPIO       | sys_iomux |
| hifi4_jtag_trstn          | The TAP reset negative signal for JTAG on HIFI4    | Input     | GPIO       | sys_iomux |
| cdns_qspi_qspi_csn1       | The chip select negative signal for QSPI            | Output    | GPIO       | sys_iomux |
| uart0_rxd                 | The data receiving signal for UART0                 | Input     | GPIO       | sys_iomux |
| uart0_txd                 | The data transmission signal for UART0              | Output    | GPIO       | sys_iomux |
| uart1_cts_n               | The Clear to Send (CTS) negative signal for UART1   | Input     | GPIO       | sys_iomux |
| uart1_rts_n               | The Require to Send (RTS) negative signal for UART1 | Output    | GPIO       | sys_iomux |
| uart1_rxd                 | The data receiving signal for UART1                 | Input     | GPIO       | sys_iomux |
| uart1_txd                 | The data transmission signal for UART1              | Output    | GPIO       | sys_iomux |
| uart2_cts_n               | The Clear to Send (CTS) negative signal for UART2   | Input     | GPIO       | sys_iomux |
| uart2_rts_n               | The Require to Send (RTS) negative signal for UART2 | Output    | GPIO       | sys_iomux |
| uart2_rxd                 | The data receiving signal for UART2                 | Input     | GPIO       | sys_iomux |
| uart2_txd                 | The data transmission signal for UART2              | Output        | GPIO  | sys_iomux |
| i2c0_i2c_scl              | The clock signal for I2C0                           | Input/Output  | GPIO  | sys_iomux |
| i2c0_i2c_sda              | The data transmission signal for I2C0               | Input/Output  | GPIO  | sys_iomux |
| i2c1_i2c_scl              | The clock signal for I2C1                           | Input/Output  | GPIO  | sys_iomux |
| i2c1_i2c_sda              | The data transmission signal for I2C1               | Input/Output  | GPIO  | sys_iomux |
| i2c2_i2c_scl              | The clock signal for I2C2                           | Input/Output  | GPIO  | sys_iomux |
| i2c2_i2c_sda              | The data transmission signal for I2C2               | Input/Output  | GPIO  | sys_iomux |
| tdm_rx                    | The receiving signal for TDM                         | Input         | GPIO  | sys_iomux |
| tdm_sync                  | The synchronization signal for TDM                  | Input/Output  | GPIO  | sys_iomux |
| tdm_tx                    | The transmission signal for TDM                      | Output        | GPIO  | sys_iomux |
| pdm_4mic_dmic0_din       | The data input signal for PDM DMIC0                 | Input         | GPIO  | sys_iomux |
| pdm_4mic_dmic1_din       | The data input signal for PDM DMIC1                 | Input         | GPIO  | sys_iomux |
| pdm_4mic_dmic_clk        | The clock signal for PDM DMIC                       | Output        | GPIO  | sys_iomux |
| uart3_rxd                 | The data receiving signal for UART3                  | Input         | GPIO  | sys_iomux |
| uart3_txd                 | The data transmission signal for UART3               | Output        | GPIO  | sys_iomux |
| uart4_cts_n               | The Clear to Send (CTS) negative signal for UART4   | Input         | GPIO  | sys_iomux |
| uart4_rts_n               | The Require to Send (RTS) negative signal for UART4  | Output        | GPIO  | sys_iomux |
| uart4_rxd                 | The data receiving signal for UART4                  | Input         | GPIO  | sys_iomux |
| uart4_txd                 | The data transmission signal for UART4               | Output        | GPIO  | sys_iomux |
| uart5_cts_n               | The Clear to Send (CTS) negative signal for UART5   | Input         | GPIO  | sys_iomux |
| uart5_rts_n               | The Require to Send (RTS) negative signal for UART5  | Output        | GPIO  | sys_iomux |
| uart5_rxd                 | The data receiving signal for UART5                  | Input         | GPIO  | sys_iomux |
| uart5_txd                 | The data transmission signal for UART5               | Output        | GPIO  | sys_iomux |
| i2c3_scl                  | The clock signal for I2C3                           | Input/Output  | GPIO  | sys_iomux |
| i2c3_sda                  | The data transmission signal for I2C3               | Input/Output  | GPIO  | sys_iomux |
| i2c4_scl                  | The clock signal for I2C4                           | Input/Output  | GPIO  | sys_iomux |
| i2c4_sda                  | The data transmission signal for I2C4               | Input/Output  | GPIO  | sys_iomux |
| i2c5_scl                  | The clock signal for I2C5                           | Input/Output  | GPIO  | sys_iomux |
| i2c5_sda                  | The data transmission signal for I2C5               | Input/Output  | GPIO  | sys_iomux |
| i2c6_scl                  | The clock signal for I2C6                           | Input/Output  | GPIO  | sys_iomux |
| i2c6_sda                  | The data transmission signal for I2C6               | Input/Output  | GPIO  | sys_iomux |
| spi0_ssp_sclk             | The clock signal for SPI0                           | Input/Output  | GPIO  | sys_iomux |
| spi0_ssp_csn              | The chip select negative signal for SPI0            | Input/Output  | GPIO  | sys_iomux |
| spi0_ssp_rxd              | The data receiving signal for SPI0                   | Input         | GPIO  | sys_iomux |
| spi0_ssp_txd              | The data transmission signal for SPI0                | Output        | GPIO  | sys_iomux |
| spi1_ssp_sclk             | The clock signal for SPI1                           | Input/Output  | GPIO  | sys_iomux |
| spi1_ssp_csn              | The chip select negative signal for SPI1            | Input/Output  | GPIO  | sys_iomux |
| spi1_ssp_rxd              | The data receiving signal for SPI1                   | Input         | GPIO  | sys_iomux |
| spi1_ssp_txd              | The data transmission signal for SPI1               | Output        | GPIO  | sys_iomux |
| spi2_ssp_sclk             | The clock signal for SPI2                           | Input/Output  | GPIO  | sys_iomux |
| spi2_ssp_csn              | The chip select negative signal for SPI2            | Input/Output  | GPIO  | sys_iomux |
| spi2_ssp_rxd              | The data receiving signal for SPI2                   | Input         | GPIO  | sys_iomux |
| spi2_ssp_txd              | The data transmission signal for SPI2                | Output        | GPIO  | sys_iomux |
| spi3_ssp_sclk             | The clock signal for SPI3                           | Input/Output  | GPIO  | sys_iomux |
| spi3_ssp_csn              | The chip select negative signal for SPI3            | Input/Output  | GPIO  | sys_iomux |
| spi3_ssp_rxd              | The data receiving signal for SPI3                   | Input         | GPIO  | sys_iomux |
| spi3_ssp_txd              | The data transmission signal for SPI3                | Output        | GPIO  | sys_iomux |
| spi4_ssp_sclk             | The clock signal for SPI4                           | Input/Output  | GPIO  | sys_iomux |
| spi4_ssp_csn              | The chip select negative signal for SPI4            | Input/Output  | GPIO  | sys_iomux |
| spi4_ssp_rxd              | The data receiving signal for SPI4                   | Input         | GPIO  | sys_iomux |
| spi4_ssp_txd              | The data transmission signal for SPI4                | Output        | GPIO  | sys_iomux |
| spi5_ssp_sclk             | The clock signal for SPI5                           | Input/Output  | GPIO  | sys_iomux |
| spi5_ssp_csn              | The chip select negative signal for SPI5            | Input/Output  | GPIO  | sys_iomux |
| spi5_ssp_rxd              | The data receiving signal for SPI5                   | Input         | GPIO  | sys_iomux |
| spi5_ssp_txd              | The data transmission signal for SPI5                | Output        | GPIO  | sys_iomux |
| spi6_ssp_sclk             | The clock signal for SPI6                           | Input/Output  | GPIO  | sys_iomux |
| spi6_ssp_csn              | The chip select negative signal for SPI6            | Input/Output  | GPIO  | sys_iomux |
| spi6_ssp_rxd              | The data receiving signal for SPI6                   | Input         | GPIO  | sys_iomux |
| spi6_ssp_txd                     | The data transmission signal for SPI6               | Output        | GPIO  | sys_iomux |
| pwm[0]                           | The PWM 0 signal                                   | Output        | GPIO  | sys_iomux |
| pwm[1]                           | The PWM 1 signal                                   | Output        | GPIO  | sys_iomux |
| pwm[2]                           | The PWM 2 signal                                   | Output        | GPIO  | sys_iomux |
| pwm[3]                           | The PWM 3 signal                                   | Output        | GPIO  | sys_iomux |
| pwm[4]                           | The PWM 4 signal                                   | Output        | GPIO  | aon_iomux |
| pwm[5]                           | The PWM 5 signal                                   | Output        | GPIO  | aon_iomux |
| pwm[6]                           | The PWM 6 signal                                   | Output        | GPIO  | aon_iomux |
| pwm[7]                           | The PWM 7 signal                                   | Output        | GPIO  | aon_iomux |
| sys_crg_clk_jtag_tck            | The TAP clock signal for JTAG on System CRG clock | Input         | GPIO  | sys_iomux |
| clkrst_src_bypass_jtag_trstn    | The TAP reset negative signal for JTAG on clock reset source bypass | Input | GPIO  | sys_iomux |
| jtag_certification_tdi           | The TAP data input signal for JTAG on Certification | Input         | GPIO  | sys_iomux |
| jtag_certification_tdo           | The TAP data output signal for JTAG on Certification | Output        | GPIO  | sys_iomux |
| jtag_certification_tms           | The TAP mode switch signal for JTAG on Certification | Input         | GPIO  | sys_iomux |
| sdio0_back_end_power             | The back end power signal for SDIO0                 | Output        | GPIO  | sys_iomux |
| sdio0_card_int_n                 | The card initialization negative signal for SDIO0    | Input         | GPIO  | sys_iomux |
| sdio0_card_power_en              | The card power supply signal for SDIO0               | Output        | GPIO  | sys_iomux |
| sdio0_card_write_prt             | The card data write signal for SDIO0                 | Input         | GPIO  | sys_iomux |
| sdio0_card_rst_n                 | The card reset negative signal for SDIO0           | Output        | GPIO  | sys_iomux |
| sdio0_ccmd_od_pullup_en_n        | The pullup enable signal for SDIO0                  | Output        | GPIO  | sys_iomux |
| sdio0_card_detect_n              | The card detect negative signal for SDIO0           | Input         | GPIO  | sys_iomux |
| sdio1_back_end_power             | The back end power signal for SDIO1                 | Output        | GPIO  | sys_iomux |
| sdio1_card_int_n                 | The card initialization negative signal for SDIO1    | Input         | GPIO  | sys_iomux |
| sdio1_card_power_en              | The card power supply signal for SDIO1               | Output        | GPIO  | sys_iomux |
| sdio1_card_write_prt             | The card data write signal for SDIO1                 | Input         | GPIO  | sys_iomux |
| sdio1_clk                        | The clock signal for SDIO1                           | Output        | GPIO  | sys_iomux |
| sdio1_ccmd                       | The Command signal of SDIO1                          | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[0]                  | The Data 0 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[1]                  | The Data 1 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[2]                  | The Data 2 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[3]                  | The Data 3 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[4]                  | The Data 4 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[5]                  | The Data 5 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[6]                  | The Data 6 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_cdata[7]                  | The Data 7 signal of SDIO1                           | Input/Output  | GPIO  | sys_iomux |
| sdio1_card_rst_n                 | The card reset signal of SDIO1                       | Output        | GPIO  | sys_iomux |
| sdio1_ccmd_od_pullup_en_n        | The pullup enable signal for SDIO1                   | Output        | GPIO  | sys_iomux |
| sdio1_data_strobe                | The data strobe signal for SDIO1                     | Input         | GPIO  | sys_iomux |
| sdio1_card_detect_n              | The card detect signal for SDIO1                   | Input         | GPIO  | sys_iomux |
| sys_crg_ext_mclk                 | The external main clock signal for System CRG      | Input         | GPIO  | sys_iomux |
| sys_crg_mclk_out                 | The main clock output signal for System CRG        | Output        | GPIO  | sys_iomux |
| sys_crg_clk_gmac_phy             | The GMAC PHY signal for System CRG                 | Output        | GPIO  | sys_iomux |
| sys_crg_i2stx_bclk_mst           | The bit clock master signal for I2S Transmission    | Output        | GPIO  | sys_iomux |
| sys_crg_i2stx_lrck_mst           | The left-right clock (frame clock) master signal for I2S Transmission | Output | GPIO  | sys_iomux |
| sys_crg_i2srx_bclk_mst           | The bit clock master signal for I2S Receiving       | Output        | GPIO  | sys_iomux |
| sys_crg_i2srx_lrck_mst           | The left-right clock (frame clock) master signal for I2S Receiving | Output | GPIO  | sys_iomux |
| sys_crg_i2stx_bclk_slv           | The bit clock slave signal for I2S Transmission     | Input         | GPIO  | sys_iomux |
| sys_crg_i2stx_lrck_slv           | The left-right clock (frame clock) slave signal for I2S Transmission | Input | GPIO  | sys_iomux |
| sys_crg_i2srx_bclk_slv           | The bit clock slave signal for I2S Receiving        | Input         | GPIO  | sys_iomux |
| sys_crg_i2srx_lrck_slv           | The left-right clock (frame clock) slave signal for I2S Receiving | Input | GPIO  | sys_iomux |
| sys_crg_tdm_clk_slv              | The TDM slave clock signal for System CRG           | Input         | GPIO  | sys_iomux |
| sys_crg_tdm_clk_mst              | The TDM master clock signal for System CRG          | Output        | GPIO  | sys_iomux |
| aon_crg_clk_32k_out              | The clock 32K output signal for AON CRG             | Output        | GPIO  | aon_iomux |
| i2stx_4ch_sdo0                   | The Sound Output 0 for I2S                          | Output        | GPIO  | sys_iomux |
| i2stx_4ch_sdo1                   | The Sound Output 1 for I2S                          | Output        | GPIO  | sys_iomux |
| i2stx_4ch_sdo2                   | The Sound Output 2 for I2S                          | Output        | GPIO  | sys_iomux |
| i2stx_4ch_sdo3                   | The Sound Output 3 for I2S                          | Output        | GPIO  | sys_iomux |
| audio_i2srx_ext_sdin0            | The Sound Input 0 for I2S                           | Input         | GPIO  | sys_iomux |
| audio_i2srx_ext_sdin1            | The Sound Input 1 for I2S                           | Input         | GPIO  | sys_iomux |
| audio_i2srx_ext_sdin2            | The Sound Input 2 for I2S                           | Input         | GPIO  | sys_iomux |
| sys_crg_clk_gclk0                | The Global Clock 0 signal for System CRG           | Output        | GPIO  | aon_iomux |
| sys_crg_clk_gclk1                | The Global Clock 1 signal for System CRG           | Output        | GPIO  | aon_iomux |
| sys_crg_clk_gclk2                | The Global Clock 2 signal for System CRG           | Output        | GPIO  | aon_iomux |
| spdif_spdifi                     | The input signal for SPDIF                          | Input         | GPIO  | sys_iomux |
| spdif_spdifo                     | The output signal for SPDIF                         | Output        | GPIO  | sys_iomux |
| vout_hdmi_tx_cec_sda             | The serial data CEC signal for HDMI Transmission    | Input/Output  | GPIO  | sys_iomux |
| vout_hdmi_tx_ddc_scl             | The serial clock DDC signal for HDMI Transmission    | Input/Output  | GPIO  | sys_iomux |
| vout_hdmi_tx_ddc_sda             | The serial data DDC signal for HDMI Transmission     | Input/Output  | GPIO  | sys_iomux |
| vout_hdmi_tx_hdmitx_hpd          | The Hot Plug Detect (HPD) signal for HDMI Transmission | Input       | GPIO  | sys_iomux |
| usb_drive_vbus_io                 | The VBUS (power supply + cable) input/output signal for USB | Output | GPIO  | sys_iomux |
| usb_overcurrent_n_io              | The over-current input/output signal for USB        | Input         | GPIO  | sys_iomux |
| u7mc_sft7110_tref                 | The Timer Reference signal for U74 MC               | Output        | GPIO  | sys_iomux |
| u7mc_sft7110_tdata[0]            | The Timer Data 0 signal for U74 MC                  | Output        | GPIO  | sys_iomux |
| u7mc_sft7110_tdata[1]            | The Timer Data 1 signal for U74 MC                 | Output        | GPIO  | sys_iomux |
| u7mc_sft7110_tdata[2]            | The Timer Data 2 signal for U74 MC                 | Output        | GPIO  | sys_iomux |
| u7mc_sft7110_tdata[3]            | The Timer Data 3 signal for U74 MC                 | Output        | GPIO  | sys_iomux |
| WAVE511_i_uart_rxsin              | The UART receiving input signal for WAVE511        | Input         | GPIO  | sys_iomux |
| WAVE511_o_uart_txsout             | The UART transmission input signal for WAVE511     | Output        | GPIO  | sys_iomux |
| GPIO_wakeup[3]                   | The GPIO Wakeup 3 signal                           | Input         | GPIO  | aon_iomux |
| GPIO_wakeup[2]                   | The GPIO Wakeup 2 signal                           | Input         | GPIO  | aon_iomux |
| GPIO_wakeup[1]                   | The GPIO Wakeup 1 signal                           | Input         | GPIO  | aon_iomux |
| GPIO_wakeup[0]                   | The GPIO Wakeup 0 signal                           | Input         | GPIO  | aon_iomux |
| can_ctrl0_can_txd                | The data transmission signal for CAN Controller 0   | Output        | GPIO  | sys_iomux |
| can_ctrl0_can_rxd                | The data receiving signal for CAN Controller 0      | Input         | GPIO  | sys_iomux |
| can_ctrl1_can_stby               | The standby signal for CAN Controller 1             | Output        | GPIO  | sys_iomux |
| can_ctrl1_can_txd                | The data transmission signal for CAN Controller 1   | Output        | GPIO  | sys_iomux |
| can_ctrl1_can_rxd                | The data receiving signal for CAN Controller 1      | Input         | GPIO  | sys_iomux |
| can_ctrl1_can_stby               | The standby signal for CAN Controller 1             | Output        | GPIO  | sys_iomux |
| can_ctrl0_tst_sample_point       | The test sample point for CAN Controller 0         | Output        | GPIO  | sys_iomux |
| can_ctrl0_tst_next_bit           | The test next point for CAN Controller 0           | Output        | GPIO  | sys_iomux |
| can_ctrl1_tst_sample_point       | The test sample point for CAN Controller 1         | Output        | GPIO  | sys_iomux |
| can_ctrl1_tst_next_bit           | The test next point for CAN Controller 1           | Output        | GPIO  | sys_iomux |
| dskit_wdt_rstout                 | The reset output signal for WDT                     | Output        | GPIO  | sys_iomux |