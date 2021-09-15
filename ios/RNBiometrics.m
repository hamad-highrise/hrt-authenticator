//
//  RNBiometrics.m
//  verify
//
//  Created by Jahanzaib Sarwar on 10/09/2021.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNBiometrics, NSObject)

RCT_EXTERN_METHOD(isSensorAvailable: (RCTPromiseResolveBlock) resolve
                            rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(createKeys: (NSString *) keyAlias
                  resolve: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(signPayload: (NSDictionary *) params
                  resolve: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(deleteKeys: (NSString *) keyAlias
                  resolve: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(showSimplePrompt: (NSString *) message
                  resolve: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

@end
