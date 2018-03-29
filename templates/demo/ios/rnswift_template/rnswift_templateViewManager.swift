import Foundation
import AVKit // This is for the camera questions asked in getCameraDirection
@objc(rnswift_templateViewManager)
class rnswift_templateViewManager: RCTViewManager, AVCapturePhotoCaptureDelegate {
    var currentView:rnswift_templateView?
    //MARK: RCTViewManager key methods
    override func view() -> rnswift_templateView {
        let newView = rnswift_templateView()
        currentView = newView
        return newView
    }
    //Note that this method should always be present, and should almost always return false for good performance. (The view will laod on the main queue regardless - this is for the manager!)
    override class func requiresMainQueueSetup() -> Bool {
        return false;
    }
    //MARK: Imperative promise sample
    var resolve:RCTPromiseResolveBlock?
    @objc func takePicture(_ resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        guard let view = currentView, let photoOutput = view.photoOutput else { reject("no_view", "No view loaded", nil); return }
        self.resolve = resolve
        let settings = AVCapturePhotoSettings(format: [AVVideoCodecKey: AVVideoCodecType.jpeg, AVVideoCompressionPropertiesKey:[ AVVideoQualityKey: 1.0]])
        photoOutput.capturePhoto(with: settings, delegate: self)
    }
    //Photo save routine - save it to the temp directory, can decide what to do with it from there
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        let temppath = FileManager.default.temporaryDirectory.appendingPathComponent(UUID.init().uuidString + ".jpeg")
        guard let d = photo.fileDataRepresentation() else { return }
        guard ((try? d.write(to:temppath)) != nil) else { return }
        if let r = resolve { r(["url": temppath.absoluteString]) }
        resolve = nil
    }
}
