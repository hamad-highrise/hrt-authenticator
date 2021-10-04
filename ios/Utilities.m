//
//  Utilities.m
//  verify
//
//  Created by Jahanzaib Sarwar on 01/09/2021.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(Utilities, NSObject)

RCT_EXTERN_METHOD(isInitiated:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setInitiated:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(preventScreenshot)
RCT_EXTERN_METHOD(allowScreenshot)

RCT_EXTERN_METHOD(checkDeviceSecurity:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
	
RCT_EXTERN_METHOD(getUUID:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
