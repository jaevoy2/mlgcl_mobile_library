import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { login } from './api/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    // Basic validation
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Prepare the data
    const loginData = {
      username: username.trim(),
      password: password,
    };

    setLoading(true);
    try {
      // Send to API
      const response = await login(loginData);
      console.log('Login response:', response);
      
      // Handle successful login here later
      Alert.alert('Success', 'Login data prepared and ready!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        MLG Library
      </ThemedText>
      
      <TextInput
        style={[
          styles.input,
          { 
            borderColor: colorScheme === 'dark' ? '#444' : '#ddd',
            color: colorScheme === 'dark' ? '#fff' : '#000',
          }
        ]}
        placeholder="Username"
        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            { 
              borderColor: colorScheme === 'dark' ? '#444' : '#ddd',
              color: colorScheme === 'dark' ? '#fff' : '#000',
            }
          ]}
          placeholder="Password"
          placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          editable={!loading}
        />
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <IconSymbol
            name={showPassword ? 'eye.slash' : 'eye'}
            size={24}
            color={colorScheme === 'dark' ? '#888' : '#999'}
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.button,
          loading && styles.buttonDisabled
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? 'Loading...' : 'Login'}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  passwordInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 50,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
    padding: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});