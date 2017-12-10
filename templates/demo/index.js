import { NativeModules, NativeEventEmitter } from "react-native";
const rnswift_template_native = NativeModules.rnswift_template;

const rnswift_template = {
  nativeObj: rnswift_template_native,
  a: rnswift_template_native.a,
  b: rnswift_template_native.b,
  startTime: rnswift_template_native.startTime,
  addListener: cb => {
    const e = new NativeEventEmitter(rnswift_template_native);
    const s = e.addListener("rnswift_template", cb);
    return s;
  },
  addListenerDemo: () => {
    rnswift_template.addListener(arr => {
      console.log("Received a rnswifttemplate event", arr.message);
    });
  },
  emitMessage: (message, delayms) => {
    if (!delayms) delayms = 0;
    return rnswift_template_native.delayedSend(message, delayms);
  },
  demoWithVoid: obj => {
    //Note no point in returning since it is a void function - no promise!
    rnswift_template_native.demoVoid(obj);
  },
  demoWithPromise: message => {
    //Returns a promise!
    return rnswift_template_native.demo(message);
  }
};

export default rnswift_template;
