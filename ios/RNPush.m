//
//  RNPush.m
//  verify
//
//  Created by Jahanzaib Sarwar on 07/10/2021.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(RNPush, NSObject)

RCT_EXTERN_METHOD(getAPNsToken: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

@end
