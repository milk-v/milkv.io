#include "paper.h"
#include "stdint.h"
#include <unistd.h>
#include <wiringx.h>
#include "ImageData.h"
#include "fonts.h"
#define SPI_PORT    0

#define EPD_DC_PIN  50
#define EPD_CS_PIN  11
#define EPD_RST_PIN  13
#define EPD_BUSY_PIN  46

PAINT_TIME sPaint_time;
PAINT Paint;


int main()
{

	//DEV_Module_Init();

	 if(DEV_Module_Init()!=0){
        return -1;
    }

	EPD_2in13_V3_Init();

	
	EPD_2in13_V3_Clear();
   
	

	uint8_t *BlackImage;
    uint16_t Imagesize = ((EPD_2in13_V3_WIDTH % 8 == 0)? (EPD_2in13_V3_WIDTH / 8 ): (EPD_2in13_V3_WIDTH / 8 + 1)) * EPD_2in13_V3_HEIGHT;
    if((BlackImage = (uint8_t *)malloc(Imagesize)) == NULL) {
        printf("Failed to apply for black memory...\r\n");
        return -1;
    }
	printf("Paint_NewImage\r\n");
    Paint_NewImage(BlackImage, EPD_2in13_V3_WIDTH, EPD_2in13_V3_HEIGHT, 90, WHITE);
	Paint_Clear(WHITE);

	printf("show image for array\r\n");
   Paint_SelectImage(BlackImage);
   Paint_Clear(WHITE);
	//Paint_DrawBitMap(milkv);//e-paper的图标
	Paint_DrawString_EN(5, 10, "HELLO", &Font16, WHITE, BLACK);//对末写

    //Paint_DrawBitMap(gImage_2in13_2);
	
   // Paint_DrawPoint(250, 2, BLACK, DOT_PIXEL_2X2, DOT_STYLE_DFT);

    EPD_2in13_V3_Display(BlackImage);
    //delay_ms(2000);
	//EPD_2in13_V3_Display(BlackImage);

   while(1)
   {

	
    

   }





}



/**
 * SPI
**/
void DEV_SPI_WriteByte(uint8_t Value)
{
   wiringXSPIDataRW(SPI_PORT, &Value,1);
}

void DEV_SPI_Write_nByte(uint8_t *pData, uint32_t Len)
{
	 wiringXSPIDataRW(SPI_PORT, pData,Len);
   
}



static void DEV_GPIO_Init(void)
{
    
	if(wiringXValidGPIO(EPD_RST_PIN) != 0) {
        printf("Invalid GPIO %d\n", EPD_RST_PIN);
    }
	pinMode(EPD_RST_PIN, PINMODE_OUTPUT);

if(wiringXValidGPIO(EPD_DC_PIN) != 0) {
        printf("Invalid GPIO %d\n", EPD_DC_PIN);
    }
	pinMode(EPD_DC_PIN, PINMODE_OUTPUT);

if(wiringXValidGPIO(EPD_CS_PIN) != 0) {
        printf("Invalid GPIO %d\n", EPD_CS_PIN);
    }
	pinMode(EPD_CS_PIN, PINMODE_OUTPUT);


if(wiringXValidGPIO(EPD_BUSY_PIN) != 0) {
        printf("Invalid GPIO %d\n", EPD_BUSY_PIN);
    }

	pinMode(EPD_BUSY_PIN, PINMODE_INPUT);
	

	EPD_CS_1;
	

}
/******************************************************************************
function:	Module Initialize, the library and initialize the pins, SPI protocol
parameter:
Info:
******************************************************************************/
uint8_t DEV_Module_Init(void)
{
	// GPIO Config
	
	
    
	
    int fd_spi;

    
    if(wiringXSetup("milkv_duos", NULL) == -1) {
        wiringXGC();
        return -1;
    }

	DEV_GPIO_Init();

	


    if ((fd_spi = wiringXSPISetup(SPI_PORT, 1800000)) <0) {
        printf("SPI Setup failed: %d\n", fd_spi);
        wiringXGC();
        return -1;
    }
     
	printf("DEV_Module_Init OK \r\n");	

}



uint8_t WF_PARTIAL_2IN13_V3[159] =
{
	0x0,0x40,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x80,0x80,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x40,0x40,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x80,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x14,0x0,0x0,0x0,0x0,0x0,0x0,  
	0x1,0x0,0x0,0x0,0x0,0x0,0x0,
	0x1,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,0x0,0x0,0x0,0x0,0x0,0x0,
	0x22,0x22,0x22,0x22,0x22,0x22,0x0,0x0,0x0,
	0x22,0x17,0x41,0x00,0x32,0x36,
};

uint8_t WS_20_30_2IN13_V3[159] =
{											
	0x80,	0x4A,	0x40,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,
	0x40,	0x4A,	0x80,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,
	0x80,	0x4A,	0x40,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,
	0x40,	0x4A,	0x80,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,
	0xF,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0xF,	0x0,	0x0,	0xF,	0x0,	0x0,	0x2,					
	0xF,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x1,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,	0x0,					
	0x22,	0x22,	0x22,	0x22,	0x22,	0x22,	0x0,	0x0,	0x0,			
	0x22,	0x17,	0x41,	0x0,	0x32,	0x36						
};

/******************************************************************************
function :	Software reset
parameter:
******************************************************************************/
static void EPD_2in13_V3_Reset(void)
{
    digitalWrite(EPD_RST_PIN, HIGH);
    delay_ms(20);
    digitalWrite(EPD_RST_PIN, LOW);
    delay_ms(2);
    digitalWrite(EPD_RST_PIN, HIGH);
    delay_ms(20);
}

/******************************************************************************
function :	send command
parameter:
     Reg : Command register
******************************************************************************/
static void EPD_2in13_V3_SendCommand(uint8_t Reg)
{
    digitalWrite(EPD_DC_PIN, LOW);
    digitalWrite(EPD_CS_PIN, LOW);
    DEV_SPI_WriteByte(Reg);
    digitalWrite(EPD_CS_PIN, HIGH);
}

/******************************************************************************
function :	send data
parameter:
    Data : Write data
******************************************************************************/
static void EPD_2in13_V3_SendData(uint8_t Data)
{
    digitalWrite(EPD_DC_PIN, HIGH);
    digitalWrite(EPD_CS_PIN, LOW);
    DEV_SPI_WriteByte(Data);
    digitalWrite(EPD_CS_PIN, HIGH);
}

/******************************************************************************
function :	Wait until the busy_pin goes LOW
parameter:
******************************************************************************/
void EPD_2in13_V3_ReadBusy(void)
{
   
	while(1)
	{	 //=1 BUSY
		if(digitalRead(EPD_BUSY_PIN)==LOW) 
			break;
		delay_ms(10);
	}
	delay_ms(10);
   
}

/******************************************************************************
function :	Turn On Display
parameter:
******************************************************************************/
static void EPD_2in13_V3_TurnOnDisplay(void)
{
	EPD_2in13_V3_SendCommand(0x22); // Display Update Control
	EPD_2in13_V3_SendData(0xc7);
	EPD_2in13_V3_SendCommand(0x20); // Activate Display Update Sequence
	EPD_2in13_V3_ReadBusy();
}

/******************************************************************************
function :	Turn On Display
parameter:	
******************************************************************************/
static void EPD_2in13_V3_TurnOnDisplay_Partial(void)
{
	EPD_2in13_V3_SendCommand(0x22); // Display Update Control
	EPD_2in13_V3_SendData(0x0f);	// fast:0x0c, quality:0x0f, 0xcf
	EPD_2in13_V3_SendCommand(0x20); // Activate Display Update Sequence
	EPD_2in13_V3_ReadBusy();
}

/******************************************************************************
function :	Set lut
parameter:	
    lut :   lut data
******************************************************************************/
static void EPD_2IN13_V3_LUT(uint8_t *lut)
{
	uint8_t count;
	EPD_2in13_V3_SendCommand(0x32);
	for(count=0; count<153; count++) 
		EPD_2in13_V3_SendData(lut[count]); 
	EPD_2in13_V3_ReadBusy();
}

/******************************************************************************
function :	Send lut data and configuration
parameter:	
    lut :   lut data
******************************************************************************/
static void EPD_2IN13_V3_LUT_by_host(uint8_t *lut)
{
	EPD_2IN13_V3_LUT((uint8_t *)lut);			//lut
	EPD_2in13_V3_SendCommand(0x3f);
	EPD_2in13_V3_SendData(*(lut+153));
	EPD_2in13_V3_SendCommand(0x03);	// gate voltage
	EPD_2in13_V3_SendData(*(lut+154));
	EPD_2in13_V3_SendCommand(0x04);	// source voltage
	EPD_2in13_V3_SendData(*(lut+155));	// VSH
	EPD_2in13_V3_SendData(*(lut+156));	// VSH2
	EPD_2in13_V3_SendData(*(lut+157));	// VSL
	EPD_2in13_V3_SendCommand(0x2c);		// VCOM
	EPD_2in13_V3_SendData(*(lut+158));
}

/******************************************************************************
function :	Setting the display window
parameter:
	Xstart : X-axis starting position
	Ystart : Y-axis starting position
	Xend : End position of X-axis
	Yend : End position of Y-axis
******************************************************************************/
static void EPD_2in13_V3_SetWindows(uint16_t Xstart, uint16_t Ystart, uint16_t Xend, uint16_t Yend)
{
    EPD_2in13_V3_SendCommand(0x44); // SET_RAM_X_ADDRESS_START_END_POSITION
    EPD_2in13_V3_SendData((Xstart>>3) & 0xFF);
    EPD_2in13_V3_SendData((Xend>>3) & 0xFF);
	
    EPD_2in13_V3_SendCommand(0x45); // SET_RAM_Y_ADDRESS_START_END_POSITION
    EPD_2in13_V3_SendData(Ystart & 0xFF);
    EPD_2in13_V3_SendData((Ystart >> 8) & 0xFF);
    EPD_2in13_V3_SendData(Yend & 0xFF);
    EPD_2in13_V3_SendData((Yend >> 8) & 0xFF);
}

/******************************************************************************
function :	Set Cursor
parameter:
	Xstart : X-axis starting position
	Ystart : Y-axis starting position
******************************************************************************/
static void EPD_2in13_V3_SetCursor(uint16_t Xstart, uint16_t Ystart)
{
    EPD_2in13_V3_SendCommand(0x4E); // SET_RAM_X_ADDRESS_COUNTER
    EPD_2in13_V3_SendData(Xstart & 0xFF);

    EPD_2in13_V3_SendCommand(0x4F); // SET_RAM_Y_ADDRESS_COUNTER
    EPD_2in13_V3_SendData(Ystart & 0xFF);
    EPD_2in13_V3_SendData((Ystart >> 8) & 0xFF);
}

/******************************************************************************
function :	Initialize the e-Paper register
parameter:
******************************************************************************/
void EPD_2in13_V3_Init(void)
{
	
	EPD_2in13_V3_Reset();
	delay_ms(100);

	EPD_2in13_V3_ReadBusy();   
	EPD_2in13_V3_SendCommand(0x12);  //SWRESET
	EPD_2in13_V3_ReadBusy();   

	EPD_2in13_V3_SendCommand(0x01); //Driver output control      
	EPD_2in13_V3_SendData(0xf9);
	EPD_2in13_V3_SendData(0x00);
	EPD_2in13_V3_SendData(0x00);

	EPD_2in13_V3_SendCommand(0x11); //data entry mode       
	EPD_2in13_V3_SendData(0x03);

	EPD_2in13_V3_SetWindows(0, 0, EPD_2in13_V3_WIDTH-1, EPD_2in13_V3_HEIGHT-1);
	EPD_2in13_V3_SetCursor(0, 0);
	
	EPD_2in13_V3_SendCommand(0x3C); //BorderWaveform
	EPD_2in13_V3_SendData(0x05);	

	EPD_2in13_V3_SendCommand(0x21); //  Display update control
	EPD_2in13_V3_SendData(0x00);
	EPD_2in13_V3_SendData(0x80);	

	EPD_2in13_V3_SendCommand(0x18); //Read built-in temperature sensor
	EPD_2in13_V3_SendData(0x80);	

	EPD_2in13_V3_ReadBusy();
	EPD_2IN13_V3_LUT_by_host(WS_20_30_2IN13_V3);

	printf("hello5");
	printf("hello5");
}

/******************************************************************************
function :	Clear screen
parameter:
******************************************************************************/
void EPD_2in13_V3_Clear(void)
{
	uint16_t Width, Height;
    Width = (EPD_2in13_V3_WIDTH % 8 == 0)? (EPD_2in13_V3_WIDTH / 8 ): (EPD_2in13_V3_WIDTH / 8 + 1);
    Height = EPD_2in13_V3_HEIGHT;
	
    EPD_2in13_V3_SendCommand(0x24);
    for (uint16_t j = 0; j < Height; j++) 
	{
        for (uint16_t i = 0; i < Width; i++) 
		{
            EPD_2in13_V3_SendData(0XFF);
        }
    }	

	EPD_2in13_V3_TurnOnDisplay();
}

/******************************************************************************
function :	Sends the image buffer in RAM to e-Paper and displays
parameter:
	image : Image data
******************************************************************************/
void EPD_2in13_V3_Display(uint8_t *Image)
{
	uint16_t Width, Height;
    Width = (EPD_2in13_V3_WIDTH % 8 == 0)? (EPD_2in13_V3_WIDTH / 8 ): (EPD_2in13_V3_WIDTH / 8 + 1);
    Height = EPD_2in13_V3_HEIGHT;
	
    EPD_2in13_V3_SendCommand(0x24);
    for (uint16_t j = 0; j < Height; j++) 
	{
        for (uint16_t i = 0; i < Width; i++) 
		{
            EPD_2in13_V3_SendData(Image[i + j * Width]);
        }
    }	
	
	EPD_2in13_V3_TurnOnDisplay();	
}


/******************************************************************************
function :	Refresh a base image
parameter:
	image : Image data	
******************************************************************************/
void EPD_2in13_V3_Display_Base(uint8_t *Image)
{  
	uint16_t Width, Height;
    Width = (EPD_2in13_V3_WIDTH % 8 == 0)? (EPD_2in13_V3_WIDTH / 8 ): (EPD_2in13_V3_WIDTH / 8 + 1);
    Height = EPD_2in13_V3_HEIGHT;
	
	EPD_2in13_V3_SendCommand(0x24);   //Write Black and White image to RAM
    for (uint16_t j = 0; j < Height; j++) 
	{
        for (uint16_t i = 0; i < Width; i++) 
		{        
			EPD_2in13_V3_SendData(Image[i + j * Width]);
		}
	}
	EPD_2in13_V3_SendCommand(0x26);   //Write Black and White image to RAM
    for (uint16_t j = 0; j < Height; j++) 
	{
        for (uint16_t i = 0; i < Width; i++) 
		{
			EPD_2in13_V3_SendData(Image[i + j * Width]);
		}
	}
	EPD_2in13_V3_TurnOnDisplay();	
}

/******************************************************************************
function :	Sends the image buffer in RAM to e-Paper and partial refresh
parameter:
	image : Image data
******************************************************************************/
void EPD_2in13_V3_Display_Partial(uint8_t *Image)
{
	uint16_t Width, Height;
    Width = (EPD_2in13_V3_WIDTH % 8 == 0)? (EPD_2in13_V3_WIDTH / 8 ): (EPD_2in13_V3_WIDTH / 8 + 1);
    Height = EPD_2in13_V3_HEIGHT;
	
	//Reset
    digitalWrite(EPD_RST_PIN, LOW);
    delay_ms(1);
    digitalWrite(EPD_RST_PIN, HIGH);

	EPD_2IN13_V3_LUT_by_host(WF_PARTIAL_2IN13_V3);

	EPD_2in13_V3_SendCommand(0x37); 
	EPD_2in13_V3_SendData(0x00);  
	EPD_2in13_V3_SendData(0x00);  
	EPD_2in13_V3_SendData(0x00);  
	EPD_2in13_V3_SendData(0x00); 
	EPD_2in13_V3_SendData(0x00);  
	EPD_2in13_V3_SendData(0x40);  ///RAM Ping-Pong enable 
	EPD_2in13_V3_SendData(0x00);  
	EPD_2in13_V3_SendData(0x00);   
	EPD_2in13_V3_SendData(0x00);  
	EPD_2in13_V3_SendData(0x00);

	EPD_2in13_V3_SendCommand(0x3C); //BorderWaveform
	EPD_2in13_V3_SendData(0x80);	

	EPD_2in13_V3_SendCommand(0x22); //Display Update Sequence Option
	EPD_2in13_V3_SendData(0xC0);    // Enable clock and  Enable analog
	EPD_2in13_V3_SendCommand(0x20);  //Activate Display Update Sequence
	EPD_2in13_V3_ReadBusy();  
	
	EPD_2in13_V3_SetWindows(0, 0, EPD_2in13_V3_WIDTH-1, EPD_2in13_V3_HEIGHT-1);
	EPD_2in13_V3_SetCursor(0, 0);

	EPD_2in13_V3_SendCommand(0x24);   //Write Black and White image to RAM
    for (uint16_t j = 0; j < Height; j++) 
	{
        for (uint16_t i = 0; i < Width; i++) 
		{
			EPD_2in13_V3_SendData(Image[i + j * Width]);
		}
	}
	EPD_2in13_V3_TurnOnDisplay_Partial();
}

/******************************************************************************
function :	Enter sleep mode
parameter:
******************************************************************************/
void EPD_2in13_V3_sleep(void)
{
	EPD_2in13_V3_SendCommand(0x10); //enter deep sleep
	EPD_2in13_V3_SendData(0x01); 
	delay_ms(100);
}

/******************************************************************************
function :	delay
parameter:
******************************************************************************/

void delay_ms(int32_t nms) {

int32_t temp;
while (nms--);

   }



/******************************************************************************
function: Create Image
parameter:
    image   :   Pointer to the image cache
    width   :   The width of the picture
    Height  :   The height of the picture
    Color   :   Whether the picture is inverted
******************************************************************************/
void Paint_NewImage(uint8_t *image, uint16_t Width, uint16_t Height, uint16_t Rotate, uint16_t Color)
{
    Paint.Image = NULL;
    Paint.Image = image;

    Paint.WidthMemory = Width;
    Paint.HeightMemory = Height;
    Paint.Color = Color;    
    Paint.Scale = 2;
    Paint.WidthByte = (Width % 8 == 0)? (Width / 8 ): (Width / 8 + 1);
    Paint.HeightByte = Height;    
//    printf("WidthByte = %d, HeightByte = %d\r\n", Paint.WidthByte, Paint.HeightByte);
//    printf(" EPD_WIDTH / 8 = %d\r\n",  122 / 8);
   
    Paint.Rotate = Rotate;
    Paint.Mirror = MIRROR_NONE;
    
    if(Rotate == ROTATE_0 || Rotate == ROTATE_180) {
        Paint.Width = Width;
        Paint.Height = Height;
    } else {
        Paint.Width = Height;
        Paint.Height = Width;
    }
}

/******************************************************************************
function: Select Image
parameter:
    image : Pointer to the image cache
******************************************************************************/
void Paint_SelectImage(uint8_t *image)
{
    Paint.Image = image;
}

/******************************************************************************
function: Select Image Rotate
parameter:
    Rotate : 0,90,180,270
******************************************************************************/
void Paint_SetRotate(uint16_t Rotate)
{
    if(Rotate == ROTATE_0 || Rotate == ROTATE_90 || Rotate == ROTATE_180 || Rotate == ROTATE_270) {
        printf("Set image Rotate %d\r\n", Rotate);
        Paint.Rotate = Rotate;
    } else {
        printf("rotate = 0, 90, 180, 270\r\n");
    }
}

/******************************************************************************
function:	Select Image mirror
parameter:
    mirror   :Not mirror,Horizontal mirror,Vertical mirror,Origin mirror
******************************************************************************/
void Paint_SetMirroring(uint8_t mirror)
{
    if(mirror == MIRROR_NONE || mirror == MIRROR_HORIZONTAL || 
        mirror == MIRROR_VERTICAL || mirror == MIRROR_ORIGIN) {
        printf("mirror image x:%s, y:%s\r\n",(mirror & 0x01)? "mirror":"none", ((mirror >> 1) & 0x01)? "mirror":"none");
        Paint.Mirror = mirror;
    } else {
        printf("mirror should be MIRROR_NONE, MIRROR_HORIZONTAL, \
        MIRROR_VERTICAL or MIRROR_ORIGIN\r\n");
    }    
}

void Paint_SetScale(uint8_t scale)
{
    if(scale == 2){
        Paint.Scale = scale;
        Paint.WidthByte = (Paint.WidthMemory % 8 == 0)? (Paint.WidthMemory / 8 ): (Paint.WidthMemory / 8 + 1);
    }else if(scale == 4){
        Paint.Scale = scale;
        Paint.WidthByte = (Paint.WidthMemory % 4 == 0)? (Paint.WidthMemory / 4 ): (Paint.WidthMemory / 4 + 1);
    }else if(scale == 7){//Only applicable with 5in65 e-Paper
		Paint.Scale = scale;
		Paint.WidthByte = (Paint.WidthMemory % 2 == 0)? (Paint.WidthMemory / 2 ): (Paint.WidthMemory / 2 + 1);;
	}else{
        printf("Set Scale Input parameter error\r\n");
        printf("Scale Only support: 2 4 7\r\n");
    }
}
/******************************************************************************
function: Draw Pixels
parameter:
    Xpoint : At point X
    Ypoint : At point Y
    Color  : Painted colors
******************************************************************************/
void Paint_SetPixel(uint16_t Xpoint, uint16_t Ypoint, uint16_t Color)
{
    if(Xpoint > Paint.Width || Ypoint > Paint.Height){
        printf("Exceeding display boundaries\r\n");
        return;
    }      
    uint16_t X, Y;
    switch(Paint.Rotate) {
    case 0:
        X = Xpoint;
        Y = Ypoint;  
        break;
    case 90:
        X = Paint.WidthMemory - Ypoint - 1;
        Y = Xpoint;
        break;
    case 180:
        X = Paint.WidthMemory - Xpoint - 1;
        Y = Paint.HeightMemory - Ypoint - 1;
        break;
    case 270:
        X = Ypoint;
        Y = Paint.HeightMemory - Xpoint - 1;
        break;
    default:
        return;
    }
    
    switch(Paint.Mirror) {
    case MIRROR_NONE:
        break;
    case MIRROR_HORIZONTAL:
        X = Paint.WidthMemory - X - 1;
        break;
    case MIRROR_VERTICAL:
        Y = Paint.HeightMemory - Y - 1;
        break;
    case MIRROR_ORIGIN:
        X = Paint.WidthMemory - X - 1;
        Y = Paint.HeightMemory - Y - 1;
        break;
    default:
        return;
    }

    
    
    if(Paint.Scale == 2){
        uint32_t Addr = X / 8 + Y * Paint.WidthByte;
        uint8_t Rdata = Paint.Image[Addr];
        if(Color == BLACK)
            Paint.Image[Addr] = Rdata & ~(0x80 >> (X % 8));
        else
            Paint.Image[Addr] = Rdata | (0x80 >> (X % 8));
    }else if(Paint.Scale == 4){
        uint32_t Addr = X / 4 + Y * Paint.WidthByte;
        Color = Color % 4;//Guaranteed color scale is 4  --- 0~3
        uint8_t Rdata = Paint.Image[Addr];
        
        Rdata = Rdata & (~(0xC0 >> ((X % 4)*2)));//Clear first, then set value
        Paint.Image[Addr] = Rdata | ((Color << 6) >> ((X % 4)*2));
    }else if(Paint.Scale == 7){
		uint32_t Addr = X / 2  + Y * Paint.WidthByte;
		uint8_t Rdata = Paint.Image[Addr];
		Rdata = Rdata & (~(0xF0 >> ((X % 2)*4)));//Clear first, then set value
		Paint.Image[Addr] = Rdata | ((Color << 4) >> ((X % 2)*4));
		// printf("Add =  %d ,data = %d\r\n",Addr,Rdata);
	}
}

/******************************************************************************
function: Clear the color of the picture
parameter:
    Color : Painted colors
******************************************************************************/
void Paint_Clear(uint16_t Color)
{	
	if(Paint.Scale == 2 || Paint.Scale == 4){
		for (uint16_t Y = 0; Y < Paint.HeightByte; Y++) {
			for (uint16_t X = 0; X < Paint.WidthByte; X++ ) {//8 pixel =  1 byte
				uint32_t Addr = X + Y*Paint.WidthByte;
				Paint.Image[Addr] = Color;
			}
		}		
	}else if(Paint.Scale == 7){
		for (uint16_t Y = 0; Y < Paint.HeightByte; Y++) {
			for (uint16_t X = 0; X < Paint.WidthByte; X++ ) {
				uint32_t Addr = X + Y*Paint.WidthByte;
				Paint.Image[Addr] = (Color<<4)|Color;
			}
		}		
	}

}

/******************************************************************************
function: Clear the color of a window
parameter:
    Xstart : x starting point
    Ystart : Y starting point
    Xend   : x end point
    Yend   : y end point
    Color  : Painted colors
******************************************************************************/
void Paint_ClearWindows(uint16_t Xstart, uint16_t Ystart, uint16_t Xend, uint16_t Yend, uint16_t Color)
{
    uint16_t X, Y;
    for (Y = Ystart; Y < Yend; Y++) {
        for (X = Xstart; X < Xend; X++) {//8 pixel =  1 byte
            Paint_SetPixel(X, Y, Color);
        }
    }
}

/******************************************************************************
function: Draw Point(Xpoint, Ypoint) Fill the color
parameter:
    Xpoint		: The Xpoint coordinate of the point
    Ypoint		: The Ypoint coordinate of the point
    Color		: Painted color
    Dot_Pixel	: point size
    Dot_Style	: point Style
******************************************************************************/
void Paint_DrawPoint(uint16_t Xpoint, uint16_t Ypoint, uint16_t Color,
                     DOT_PIXEL Dot_Pixel, DOT_STYLE Dot_Style)
{
    if (Xpoint > Paint.Width || Ypoint > Paint.Height) {
        printf("Paint_DrawPoint Input exceeds the normal display range\r\n");
        return;
    }

    int16_t XDir_Num , YDir_Num;
    if (Dot_Style == DOT_FILL_AROUND) {
        for (XDir_Num = 0; XDir_Num < 2 * Dot_Pixel - 1; XDir_Num++) {
            for (YDir_Num = 0; YDir_Num < 2 * Dot_Pixel - 1; YDir_Num++) {
                if(Xpoint + XDir_Num - Dot_Pixel < 0 || Ypoint + YDir_Num - Dot_Pixel < 0)
                    break;
                // printf("x = %d, y = %d\r\n", Xpoint + XDir_Num - Dot_Pixel, Ypoint + YDir_Num - Dot_Pixel);
                Paint_SetPixel(Xpoint + XDir_Num - Dot_Pixel, Ypoint + YDir_Num - Dot_Pixel, Color);
            }
        }
    } else {
        for (XDir_Num = 0; XDir_Num <  Dot_Pixel; XDir_Num++) {
            for (YDir_Num = 0; YDir_Num <  Dot_Pixel; YDir_Num++) {
                Paint_SetPixel(Xpoint + XDir_Num - 1, Ypoint + YDir_Num - 1, Color);
            }
        }
    }
}

/******************************************************************************
function: Draw a line of arbitrary slope
parameter:
    Xstart ：Starting Xpoint point coordinates
    Ystart ：Starting Xpoint point coordinates
    Xend   ：End point Xpoint coordinate
    Yend   ：End point Ypoint coordinate
    Color  ：The color of the line segment
    Line_width : Line width
    Line_Style: Solid and dotted lines
******************************************************************************/
void Paint_DrawLine(uint16_t Xstart, uint16_t Ystart, uint16_t Xend, uint16_t Yend,
                    uint16_t Color, DOT_PIXEL Line_width, LINE_STYLE Line_Style)
{
    if (Xstart > Paint.Width || Ystart > Paint.Height ||
        Xend > Paint.Width || Yend > Paint.Height) {
        printf("Paint_DrawLine Input exceeds the normal display range\r\n");
        return;
    }

    uint16_t Xpoint = Xstart;
    uint16_t Ypoint = Ystart;
    int dx = (int)Xend - (int)Xstart >= 0 ? Xend - Xstart : Xstart - Xend;
    int dy = (int)Yend - (int)Ystart <= 0 ? Yend - Ystart : Ystart - Yend;

    // Increment direction, 1 is positive, -1 is counter;
    int XAddway = Xstart < Xend ? 1 : -1;
    int YAddway = Ystart < Yend ? 1 : -1;

    //Cumulative error
    int Esp = dx + dy;
    char Dotted_Len = 0;

    for (;;) {
        Dotted_Len++;
        //Painted dotted line, 2 point is really virtual
        if (Line_Style == LINE_STYLE_DOTTED && Dotted_Len % 3 == 0) {
            //printf("LINE_DOTTED\r\n");
            Paint_DrawPoint(Xpoint, Ypoint, IMAGE_BACKGROUND, Line_width, DOT_STYLE_DFT);
            Dotted_Len = 0;
        } else {
            Paint_DrawPoint(Xpoint, Ypoint, Color, Line_width, DOT_STYLE_DFT);
        }
        if (2 * Esp >= dy) {
            if (Xpoint == Xend)
                break;
            Esp += dy;
            Xpoint += XAddway;
        }
        if (2 * Esp <= dx) {
            if (Ypoint == Yend)
                break;
            Esp += dx;
            Ypoint += YAddway;
        }
    }
}

/******************************************************************************
function: Draw a rectangle
parameter:
    Xstart ：Rectangular  Starting Xpoint point coordinates
    Ystart ：Rectangular  Starting Xpoint point coordinates
    Xend   ：Rectangular  End point Xpoint coordinate
    Yend   ：Rectangular  End point Ypoint coordinate
    Color  ：The color of the Rectangular segment
    Line_width: Line width
    Draw_Fill : Whether to fill the inside of the rectangle
******************************************************************************/
void Paint_DrawRectangle(uint16_t Xstart, uint16_t Ystart, uint16_t Xend, uint16_t Yend,
                         uint16_t Color, DOT_PIXEL Line_width, DRAW_FILL Draw_Fill)
{
    if (Xstart > Paint.Width || Ystart > Paint.Height ||
        Xend > Paint.Width || Yend > Paint.Height) {
        printf("Input exceeds the normal display range\r\n");
        return;
    }

    if (Draw_Fill) {
        uint16_t Ypoint;
        for(Ypoint = Ystart; Ypoint < Yend; Ypoint++) {
            Paint_DrawLine(Xstart, Ypoint, Xend, Ypoint, Color , Line_width, LINE_STYLE_SOLID);
        }
    } else {
        Paint_DrawLine(Xstart, Ystart, Xend, Ystart, Color, Line_width, LINE_STYLE_SOLID);
        Paint_DrawLine(Xstart, Ystart, Xstart, Yend, Color, Line_width, LINE_STYLE_SOLID);
        Paint_DrawLine(Xend, Yend, Xend, Ystart, Color, Line_width, LINE_STYLE_SOLID);
        Paint_DrawLine(Xend, Yend, Xstart, Yend, Color, Line_width, LINE_STYLE_SOLID);
    }
}

/******************************************************************************
function: Use the 8-point method to draw a circle of the
            specified size at the specified position->
parameter:
    X_Center  ：Center X coordinate
    Y_Center  ：Center Y coordinate
    Radius    ：circle Radius
    Color     ：The color of the ：circle segment
    Line_width: Line width
    Draw_Fill : Whether to fill the inside of the Circle
******************************************************************************/
void Paint_DrawCircle(uint16_t X_Center, uint16_t Y_Center, uint16_t Radius,
                      uint16_t Color, DOT_PIXEL Line_width, DRAW_FILL Draw_Fill)
{
    if (X_Center > Paint.Width || Y_Center >= Paint.Height) {
        printf("Paint_DrawCircle Input exceeds the normal display range\r\n");
        return;
    }

    //Draw a circle from(0, R) as a starting point
    int16_t XCurrent, YCurrent;
    XCurrent = 0;
    YCurrent = Radius;

    //Cumulative error,judge the next point of the logo
    int16_t Esp = 3 - (Radius << 1 );

    int16_t sCountY;
    if (Draw_Fill == DRAW_FILL_FULL) {
        while (XCurrent <= YCurrent ) { //Realistic circles
            for (sCountY = XCurrent; sCountY <= YCurrent; sCountY ++ ) {
                Paint_DrawPoint(X_Center + XCurrent, Y_Center + sCountY, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);//1
                Paint_DrawPoint(X_Center - XCurrent, Y_Center + sCountY, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);//2
                Paint_DrawPoint(X_Center - sCountY, Y_Center + XCurrent, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);//3
                Paint_DrawPoint(X_Center - sCountY, Y_Center - XCurrent, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);//4
                Paint_DrawPoint(X_Center - XCurrent, Y_Center - sCountY, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);//5
                Paint_DrawPoint(X_Center + XCurrent, Y_Center - sCountY, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);//6
                Paint_DrawPoint(X_Center + sCountY, Y_Center - XCurrent, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);//7
                Paint_DrawPoint(X_Center + sCountY, Y_Center + XCurrent, Color, DOT_PIXEL_DFT, DOT_STYLE_DFT);
            }
            if (Esp < 0 )
                Esp += 4 * XCurrent + 6;
            else {
                Esp += 10 + 4 * (XCurrent - YCurrent );
                YCurrent --;
            }
            XCurrent ++;
        }
    } else { //Draw a hollow circle
        while (XCurrent <= YCurrent ) {
            Paint_DrawPoint(X_Center + XCurrent, Y_Center + YCurrent, Color, Line_width, DOT_STYLE_DFT);//1
            Paint_DrawPoint(X_Center - XCurrent, Y_Center + YCurrent, Color, Line_width, DOT_STYLE_DFT);//2
            Paint_DrawPoint(X_Center - YCurrent, Y_Center + XCurrent, Color, Line_width, DOT_STYLE_DFT);//3
            Paint_DrawPoint(X_Center - YCurrent, Y_Center - XCurrent, Color, Line_width, DOT_STYLE_DFT);//4
            Paint_DrawPoint(X_Center - XCurrent, Y_Center - YCurrent, Color, Line_width, DOT_STYLE_DFT);//5
            Paint_DrawPoint(X_Center + XCurrent, Y_Center - YCurrent, Color, Line_width, DOT_STYLE_DFT);//6
            Paint_DrawPoint(X_Center + YCurrent, Y_Center - XCurrent, Color, Line_width, DOT_STYLE_DFT);//7
            Paint_DrawPoint(X_Center + YCurrent, Y_Center + XCurrent, Color, Line_width, DOT_STYLE_DFT);//0

            if (Esp < 0 )
                Esp += 4 * XCurrent + 6;
            else {
                Esp += 10 + 4 * (XCurrent - YCurrent );
                YCurrent --;
            }
            XCurrent ++;
        }
    }
}

/******************************************************************************
function: Show English characters
parameter:
    Xpoint           ：X coordinate
    Ypoint           ：Y coordinate
    Acsii_Char       ：To display the English characters
    Font             ：A structure pointer that displays a character size
    Color_Foreground : Select the foreground color
    Color_Background : Select the background color
******************************************************************************/
void Paint_DrawChar(uint16_t Xpoint, uint16_t Ypoint, const char Acsii_Char,
                    sFONT* Font, uint16_t Color_Foreground, uint16_t Color_Background)
{
    uint16_t Page, Column;

    if (Xpoint > Paint.Width || Ypoint > Paint.Height) {
        printf("Paint_DrawChar Input exceeds the normal display range\r\n");
        return;
    }

    uint32_t Char_Offset = (Acsii_Char - ' ') * Font->Height * (Font->Width / 8 + (Font->Width % 8 ? 1 : 0));
    const unsigned char *ptr = &Font->table[Char_Offset];

    for (Page = 0; Page < Font->Height; Page ++ ) {
        for (Column = 0; Column < Font->Width; Column ++ ) {

            //To determine whether the font background color and screen background color is consistent
            if (FONT_BACKGROUND == Color_Background) { //this process is to speed up the scan
                if (*ptr & (0x80 >> (Column % 8)))
                    Paint_SetPixel(Xpoint + Column, Ypoint + Page, Color_Foreground);
                    // Paint_DrawPoint(Xpoint + Column, Ypoint + Page, Color_Foreground, DOT_PIXEL_DFT, DOT_STYLE_DFT);
            } else {
                if (*ptr & (0x80 >> (Column % 8))) {
                    Paint_SetPixel(Xpoint + Column, Ypoint + Page, Color_Foreground);
                    // Paint_DrawPoint(Xpoint + Column, Ypoint + Page, Color_Foreground, DOT_PIXEL_DFT, DOT_STYLE_DFT);
                } else {
                    Paint_SetPixel(Xpoint + Column, Ypoint + Page, Color_Background);
                    // Paint_DrawPoint(Xpoint + Column, Ypoint + Page, Color_Background, DOT_PIXEL_DFT, DOT_STYLE_DFT);
                }
            }
            //One pixel is 8 bits
            if (Column % 8 == 7)
                ptr++;
        }// Write a line
        if (Font->Width % 8 != 0)
            ptr++;
    }// Write all
}



/******************************************************************************
function: Display the string
parameter:
    Xstart  ：X coordinate
    Ystart  ：Y coordinate
    pString ：The first address of the Chinese string and English
              string to be displayed
    Font    ：A structure pointer that displays a character size
    Color_Foreground : Select the foreground color
    Color_Background : Select the background color
******************************************************************************/
void Paint_DrawString_EN(uint16_t Xstart, uint16_t Ystart, const char * pString,
                         sFONT* Font, uint16_t Color_Foreground, uint16_t Color_Background)
{
    uint16_t Xpoint = Xstart;
    uint16_t Ypoint = Ystart;

    if (Xstart > Paint.Width || Ystart > Paint.Height) {
        printf("Paint_DrawString_EN Input exceeds the normal display range\r\n");
        return;
    }

    while (* pString != '\0') {
        //if X direction filled , reposition to(Xstart,Ypoint),Ypoint is Y direction plus the Height of the character
        if ((Xpoint + Font->Width ) > Paint.Width ) {
            Xpoint = Xstart;
            Ypoint += Font->Height;
        }

        // If the Y direction is full, reposition to(Xstart, Ystart)
        if ((Ypoint  + Font->Height ) > Paint.Height ) {
            Xpoint = Xstart;
            Ypoint = Ystart;
        }
        Paint_DrawChar(Xpoint, Ypoint, * pString, Font, Color_Background, Color_Foreground);

        //The next character of the address
        pString ++;

        //The next word of the abscissa increases the font of the broadband
        Xpoint += Font->Width;
    }
}


/******************************************************************************
function: Display the string
parameter:
    Xstart  ：X coordinate
    Ystart  ：Y coordinate
    pString ：The first address of the Chinese string and English
              string to be displayed
    Font    ：A structure pointer that displays a character size
    Color_Foreground : Select the foreground color
    Color_Background : Select the background color
******************************************************************************/

/******************************************************************************
function:	Display nummber
parameter:
    Xstart           ：X coordinate
    Ystart           : Y coordinate
    Nummber          : The number displayed
    Font             ：A structure pointer that displays a character size
    Color_Foreground : Select the foreground color
    Color_Background : Select the background color
******************************************************************************/
#define  ARRAY_LEN 255
void Paint_DrawNum(uint16_t Xpoint, uint16_t Ypoint, int32_t Nummber,
                   sFONT* Font, uint16_t Color_Foreground, uint16_t Color_Background)
{

    int16_t Num_Bit = 0, Str_Bit = 0;
    uint8_t Str_Array[ARRAY_LEN] = {0}, Num_Array[ARRAY_LEN] = {0};
    uint8_t *pStr = Str_Array;

    if (Xpoint > Paint.Width || Ypoint > Paint.Height) {
        printf("Paint_DisNum Input exceeds the normal display range\r\n");
        return;
    }

    //Converts a number to a string
    while (Nummber) {
        Num_Array[Num_Bit] = Nummber % 10 + '0';
        Num_Bit++;
        Nummber /= 10;
    }

    //The string is inverted
    while (Num_Bit > 0) {
        Str_Array[Str_Bit] = Num_Array[Num_Bit - 1];
        Str_Bit ++;
        Num_Bit --;
    }

    //show
    Paint_DrawString_EN(Xpoint, Ypoint, (const char*)pStr, Font, Color_Background, Color_Foreground);
}

/******************************************************************************
function:	Display time
parameter:
    Xstart           ：X coordinate
    Ystart           : Y coordinate
    pTime            : Time-related structures
    Font             ：A structure pointer that displays a character size
    Color_Foreground : Select the foreground color
    Color_Background : Select the background color
******************************************************************************/
void Paint_DrawTime(uint16_t Xstart, uint16_t Ystart, PAINT_TIME *pTime, sFONT* Font,
                    uint16_t Color_Foreground, uint16_t Color_Background)
{
    uint8_t value[10] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

    uint16_t Dx = Font->Width;

    //Write data into the cache
    Paint_DrawChar(Xstart                           , Ystart, value[pTime->Hour / 10], Font, Color_Background, Color_Foreground);
    Paint_DrawChar(Xstart + Dx                      , Ystart, value[pTime->Hour % 10], Font, Color_Background, Color_Foreground);
    Paint_DrawChar(Xstart + Dx  + Dx / 4 + Dx / 2   , Ystart, ':'                    , Font, Color_Background, Color_Foreground);
    Paint_DrawChar(Xstart + Dx * 2 + Dx / 2         , Ystart, value[pTime->Min / 10] , Font, Color_Background, Color_Foreground);
    Paint_DrawChar(Xstart + Dx * 3 + Dx / 2         , Ystart, value[pTime->Min % 10] , Font, Color_Background, Color_Foreground);
    Paint_DrawChar(Xstart + Dx * 4 + Dx / 2 - Dx / 4, Ystart, ':'                    , Font, Color_Background, Color_Foreground);
    Paint_DrawChar(Xstart + Dx * 5                  , Ystart, value[pTime->Sec / 10] , Font, Color_Background, Color_Foreground);
    Paint_DrawChar(Xstart + Dx * 6                  , Ystart, value[pTime->Sec % 10] , Font, Color_Background, Color_Foreground);
}

/******************************************************************************
function:	Display monochrome bitmap
parameter:
    image_buffer ：A picture data converted to a bitmap
info:
    Use a computer to convert the image into a corresponding array,
    and then embed the array directly into Imagedata.cpp as a .c file.
******************************************************************************/
void Paint_DrawBitMap(const unsigned char* image_buffer)
{
    uint16_t x, y;
    uint32_t Addr = 0;

    for (y = 0; y < Paint.HeightByte; y++) {
        for (x = 0; x < Paint.WidthByte; x++) {//8 pixel =  1 byte
            Addr = x + y * Paint.WidthByte;
            Paint.Image[Addr] = (unsigned char)image_buffer[Addr];
        }
    }
}


	



