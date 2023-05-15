//
//  RNSharedWidget.h
//  Weather_App
//
//  Created by Nguyễn Hiệp on 15/05/2023.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RNSharedWidget : NSObject<RCTBridgeModule>

@end

