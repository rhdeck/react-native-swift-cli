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
      console.log("Received a rnswift_template event", arr.message);
    });
  },
  emitMessage: async (message, delayms) => {
    if (!delayms) delayms = 0;
    return await rnswift_template_native.delayedSend(message, delayms);
  },
  demoWithPromise: async message => {
    //Returns a promise!
    const output = await rnswift_template_native.demo(message);
    return output;
  }
};

export default rnswift_template;
