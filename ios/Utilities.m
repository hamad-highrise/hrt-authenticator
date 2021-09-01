//
//  Utilities.m
//  verify
//
//  Created by Jahanzaib Sarwar on 01/09/2021.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(Utilities, NSObject)
RCT_EXTERN_METHOD(logTest)
RCT_EXTERN_METHOD(isInitiated:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setInitiated:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
