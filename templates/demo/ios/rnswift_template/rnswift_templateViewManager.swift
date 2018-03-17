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
    var photoOutput:AVCapturePhotoOutput?
    @objc func takePicture(_ resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        guard let view = currentView else { reject("no_view", "No view loaded", nil); return }
        guard let session = view.thisSession else { reject("no_session", "No AV capture session running", nil); return }
        if let p = self.photoOutput {
            session.removeOutput(p)
            self.photoOutput = nil
        }
        let photoOutput = AVCapturePhotoOutput()
        session.addOutput(photoOutput)
        self.resolve = resolve
        self.photoOutput = photoOutput
        let settings = AVCapturePhotoSettings(format: [AVVideoCodecKey: AVVideoCodecType.jpeg])
        photoOutput.capturePhoto(with: settings, delegate: self)
    }
    //Photo save routine - save it to the temp directory, can decide what to do with it from there
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        guard let d = photo.fileDataRepresentation() else { return }
        let temppath = FileManager.default.temporaryDirectory.appendingPathComponent(UUID.init().uuidString + ".jpeg")
         guard ((try? d.write(to:temppath)) != nil) else { return }
        if let r = resolve { r(["path": temppath]) }
        resolve = nil
        guard let view = currentView else { return }
        guard let session = view.thisSession else { return }
        if let po = photoOutput {
            session.removeOutput(po)
        }
        photoOutput = nil
    }
}
