import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const FRAME_SIZE = width * 0.7; // 70% of screen width

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleScan = async () => {
    if (!permission) {
      // Camera permissions are still loading
      return;
    }

    if (!permission.granted) {
      // Request permission
      const { granted } = await requestPermission();
      if (granted) {
        setIsCameraActive(true);
      }
    } else {
      setIsCameraActive(true);
    }
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
  };

  if (isCameraActive && permission?.granted) {
    return (
      <ThemedView style={styles.container}>
        <CameraView 
          style={styles.camera}
          facing="back"
        >
          <View style={styles.cameraOverlay}>
            <ThemedText style={styles.instructionText}>
              Position School ID within frame
            </ThemedText>
            
            {/* Semi-transparent overlay */}
            <View style={styles.overlay}>
              <View style={styles.overlayTop} />
              
              <View style={styles.overlayMiddle}>
                <View style={styles.overlaySide} />
                
                {/* Square frame */}
                <View style={[styles.frame, { width: FRAME_SIZE, height: FRAME_SIZE }]}>
                  <View style={[styles.corner, styles.cornerTopLeft]} />
                  <View style={[styles.corner, styles.cornerTopRight]} />
                  <View style={[styles.corner, styles.cornerBottomLeft]} />
                  <View style={[styles.corner, styles.cornerBottomRight]} />
                </View>
                
                <View style={styles.overlaySide} />
              </View>
              
              {/* close button */}
              <View style={styles.overlayBottom}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={handleCloseCamera}
                >
                  <Ionicons name="close-circle" size={60} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CameraView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={[
        styles.cameraContainer,
        { 
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderColor: Colors[colorScheme ?? 'light'].icon 
        }
      ]}>
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
          isDark ? {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: '#fff',
          } : {
            backgroundColor: Colors[colorScheme ?? 'light'].tint,
          }
        ]}
        onPress={handleScan}
      >
        <Ionicons name="qr-code" size={24} color="#fff" />
        <ThemedText style={styles.buttonText}>
          Scan School ID
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  disabledText: {
    fontSize: 18,
    marginTop: 20,
    opacity: 0.7,
  },
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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
  closeButton: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  frame: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fff',
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