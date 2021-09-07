//
//  RNSecure.m
//  verify
//
//  Created by Jahanzaib Sarwar on 02/09/2021.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNSecure, NSObject)

RCT_EXTERN_METHOD(encrypt: (NSString *)payload
                  keyAlias: (NSString *)keyAlias
                  resolve: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(decrypt: (NSString *)cipherText
                  keyAlias: (NSString *)keyAlias
                  resolve: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
@end
