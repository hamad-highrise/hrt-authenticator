#import "AppDelegate.h"
#import "Verify-Swift.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
#import <React/RCTLinkingManager.h>
@import Firebase;


#import <UserNotifications/UserNotifications.h>

#if RCT_DEV
#import "React/RCTDevLoadingView.h"
#endif

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>



static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@interface AppDelegate() <UNUserNotificationCenterDelegate>

@end



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
 
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"verify"
                                            initialProperties:nil];
  [UNUserNotificationCenter currentNotificationCenter].delegate = self;

#if RCT_DEV
  [bridge moduleForClass:[RCTDevLoadingView class]];
#endif
  
  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }



  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [RNSplashScreen show];
  [RNPush requestPushAuthorization];
  [FIRApp configure];
  return YES;
}

- (void) application: (UIApplication *) app didRegisterForRemoteNotificationsWithDeviceToken:(nonnull NSData *)deviceToken {
  

}

- (void)application:(UIApplication *) application didFailToRegisterForRemoteNotificationsWithError:(nonnull NSError *)error {
  
}

- (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
//  [RNPush onNotification:userInfo];
  NSLog(@"Hello notification");
  completionHandler(UIBackgroundFetchResultNoData);
}



- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

-(BOOL) application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [RCTLinkingManager application:app openURL:url options:options];
}

-(void) userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  NSDictionary *userInfo = notification.request.content.userInfo;
  NSLog(@"%@", userInfo);
  completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionAlert);
}

-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  NSLog(@"%@", userInfo);
  NSString *tenantKey = @"com.ibm.security.access.mmfa.tenant";
  NSString *tenantId = userInfo[tenantKey];
  [RNPush onNotificationTap:userInfo];
  NSLog(@"Tenant ID of the transaction %@", tenantId);
  NSURL *url = [NSURL URLWithString:@"baflverify://transaction?tenantId="];
  [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];
  completionHandler();
}


@end
