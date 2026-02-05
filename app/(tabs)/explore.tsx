import { BarcodeScanner } from "@/components/barcode-scanner";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const FRAME_SIZE = width * 0.8; //80% of screen width

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>("back"); // Add state for camera type

  const handleScan = () => setIsCameraActive(true);
  const handleCloseCamera = () => setIsCameraActive(false);

  // Toggle between front and back camera
  const toggleCameraType = () => {
    setCameraType((prev) => (prev === "back" ? "front" : "back"));
  };
  // Fetch data from dummyqr array
  const handleScanned = (data: string) => {
    alert(`Scanned Data: ${data}`);
    setIsCameraActive(false);
  };

  if (isCameraActive) {
    return (
      <View style={{ flex: 1 }}>
        <BarcodeScanner
          instruction="Scan the QR/Barcode on the book to return"
          frameSize={FRAME_SIZE}
          onScanned={handleScanned}
          onClose={handleCloseCamera}
          cameraType={cameraType} // Pass cameraType to barcode-scanner.tsx
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 40,
            right: 30,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 30,
            padding: 10,
            zIndex: 10,
          }}
          onPress={toggleCameraType}
        >
          <Ionicons name="camera-reverse" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.cameraContainer,
          {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderColor: Colors[colorScheme ?? "light"].icon,
          },
        ]}
      >
        <Ionicons
          name="camera"
          size={80}
          color={Colors[colorScheme ?? "light"].tabIconDefault}
        />
        <ThemedText style={styles.disabledText}>Camera Disabled</ThemedText>
      </View>
      <TouchableOpacity
        style={[
          styles.scanButton,
          isDark
            ? {
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: "#fff",
              }
            : {
                backgroundColor: Colors[colorScheme ?? "light"].tint,
              },
        ]}
        onPress={handleScan}
      >
        <Ionicons name="qr-code" size={24} color="#fff" />
        <ThemedText style={styles.buttonText}>Scan Book QR/Barcode</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: 300,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    opacity: 0.5,
  },
  disabledText: {
    fontSize: 18,
    marginTop: 20,
    opacity: 0.7,
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 30,
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  instructionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: 40,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  overlayMiddle: {
    flexDirection: "row",
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  frame: {
    backgroundColor: "transparent",
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#fff",
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
});
