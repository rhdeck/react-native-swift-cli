#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(rnswift_template, NSObject)
RCT_EXTERN_METHOD(demo:(NSString *)name success:(RCTPromiseResolveBlock)success reject:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(voidDemo:(NSDictionary *)dic);
RCT_EXTERN_METHOD(delayedSend:(NSString *)message ms:(int)ms);
@end

