import {
    BarcodeScanningResult,
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { CameraOverlay } from "./camera-overlay";

export function BarcodeScanner({
  instruction,
  frameSize,
  onScanned,
  onClose,
}: {
  instruction: string;
  frameSize: number;
  onScanned: (data: string) => void;
  onClose: () => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission?.granted) {
    requestPermission();
    return null;
  }

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    onScanned(result.data);
    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <CameraView
      style={StyleSheet.absoluteFill}
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: ["qr", "ean13", "code128"],
      }}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    >
      <CameraOverlay
        instruction={instruction}
        onClose={onClose}
        frameSize={frameSize}
      />
    </CameraView>
  );
}
