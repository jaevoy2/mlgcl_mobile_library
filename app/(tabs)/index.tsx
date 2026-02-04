import { StyleSheet, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { getBookData } from '../api/books';

const { width } = Dimensions.get('window');
const FRAME_SIZE = width * 0.7;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedBook, setScannedBook] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(true); 
  const hasScanned = useRef(false);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {

    if (hasScanned.current) return;
    hasScanned.current = true;

    setIsCameraActive(false);
    setIsScanning(false);

    try {
      const bookId = parseInt(data);
      
      if (isNaN(bookId)) {
        Alert.alert('Error', 'Invalid QR code');
        hasScanned.current = false;
        return;
      }

      const bookData = await getBookData(bookId);

      if (bookData) {
        setScannedBook(bookData);
        console.log(bookData);
      } else {
        Alert.alert('Error', 'Book not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch book data');
      console.error(error);
    } finally{
      hasScanned.current = false;
    }
  };

  const handleScanPress = async () => {
    hasScanned.current = false;
    setIsScanning(true);

    if (permission?.granted) {
      setIsCameraActive(true);
    } else if (permission?.canAskAgain) {
      const result = await requestPermission();
      if (result.granted) {
        setIsCameraActive(true);
      }
    } else {
      Alert.alert('Permission denied', 'Camera permission is required');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {isCameraActive && permission?.granted ? (
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        >
          <View style={styles.cameraOverlay}>
            <ThemedText style={styles.instructionText}>
              Position Book QR within frame
            </ThemedText>

            <View style={styles.overlay}>
              <View style={styles.overlayTop} />
              <View style={styles.overlayMiddle}>
                <View style={styles.overlaySide} />
                <View style={[styles.frame, { width: FRAME_SIZE, height: FRAME_SIZE }]} />
                <View style={styles.overlaySide} />
              </View>
              <View style={styles.overlayBottom}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraActive(false)}>
                  <Ionicons name="close-circle" size={60} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CameraView>
      ) : (
        <>
          <View
            style={[
              styles.cameraContainer,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderColor: Colors[colorScheme ?? 'light'].icon,
              },
            ]}
          >
            <Ionicons
              name="camera"
              size={80}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
            <ThemedText style={styles.disabledText}>Camera Disabled</ThemedText>
          </View>

          <TouchableOpacity
            style={[
              styles.scanButton,
              isDark
                ? { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#fff' }
                : { backgroundColor: Colors[colorScheme ?? 'light'].tint },
            ]}
            onPress={handleScanPress}
          >
            <Ionicons name="qr-code" size={24} color="#fff" />
            <ThemedText style={styles.buttonText}>Scan Book QR</ThemedText>
          </TouchableOpacity>

          {scannedBook && (
            <View style={{ marginTop: 20, alignItems: 'center', paddingHorizontal: 20 }}>
              <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
                {scannedBook.title}
              </ThemedText>
              {scannedBook.subtitle && (
                <ThemedText style={{ marginTop: 5 }}>{scannedBook.subtitle}</ThemedText>
              )}
              {scannedBook.description && (
                <ThemedText style={{ marginTop: 10, textAlign: 'center' }}>
                  {scannedBook.description}
                </ThemedText>
              )}
            </View>
          )}
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraContainer: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.5,
  },
  disabledText: { fontSize: 18, marginTop: 20, opacity: 0.7 },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 30,
    gap: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  camera: { flex: 1, width: '100%' },
  cameraOverlay: { flex: 1, backgroundColor: 'transparent' },
  instructionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 60,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    zIndex: 10,
  },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  overlayTop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  overlayMiddle: { flexDirection: 'row' },
  overlaySide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  frame: { backgroundColor: 'transparent', position: 'relative', borderWidth: 2, borderColor: '#fff' },
  closeButton: { alignSelf: 'center', marginBottom: 40 },
});