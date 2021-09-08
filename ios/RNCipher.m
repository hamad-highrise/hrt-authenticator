//
//  RNCipher.m
//  verify
//
//  Created by Jahanzaib Sarwar on 08/09/2021.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(RNCipher, NSObject)

RCT_EXTERN_METHOD(encrypt: (NSDictionary *) params
                  resolve: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(decrypt: (NSDictionary *) params
                  resolve: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)


@end
