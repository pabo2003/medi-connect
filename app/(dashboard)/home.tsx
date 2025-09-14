import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const features: { id: string; title: string; icon: keyof typeof MaterialIcons.glyphMap; description: string }[] = [
    { id: '1', title: 'Medicine Management', icon: 'medical-services', description: 'Browse and order medicines with detailed information' },
    { id: '2', title: 'Health Packages', icon: 'inventory', description: 'Specialized health packages tailored to your needs' },
    { id: '3', title: 'Wellness Guidance', icon: 'favorite', description: 'Daily health tips and medication reminders' },
    { id: '4', title: '24/7 Support', icon: 'support-agent', description: 'Round the clock customer support and consultation' },
  ];

  const contactMethods: { id: string; type: string; value: string; icon: 'phone' | 'email' | 'location-on'; action: string }[] = [
    { id: '1', type: 'Phone', value: '+1 (555) 123-4567', icon: 'phone', action: 'tel:+15551234567' },
    { id: '2', type: 'Email', value: 'support@mediconnect.com', icon: 'email', action: 'mailto:support@mediconnect.com' },
    { id: '3', type: 'Address', value: '123 Health Street, Medical City', icon: 'location-on', action: 'https://maps.google.com' },
  ];

  const renderFeatureItem = ({ item }: { item: { id: string; title: string; icon: string; description: string } }) => (
    <View style={styles.featureCard}>
      <View style={styles.featureIconContainer}>
        <MaterialIcons name={item.icon} size={28} color="#7226ff" />
      </View>
      <Text style={styles.featureTitle}>{item.title}</Text>
      <Text style={styles.featureDescription}>{item.description}</Text>
    </View>
  );

  const renderContactItem = ({ item }: { item: { id: string; type: string; value: string; icon: 'phone' | 'email' | 'location-on'; action: string } }) => (
    <TouchableOpacity 
      style={styles.contactCard}
      onPress={() => Linking.openURL(item.action)}
    >
      <MaterialIcons name={item.icon} size={24} color="#7226ff" />
      <View style={styles.contactInfo}>
        <Text style={styles.contactType}>{item.type}</Text>
        <Text style={styles.contactValue}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#7226ff', '#f042ff']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.appName}>MediConnect🤍</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* About Us Section */}
        <LinearGradient
          colors={['#7474BF', '#348AC7']}
          style={styles.aboutSection}
        >
          <Text style={styles.sectionTitle}>About MediConnect</Text>
          <Text style={styles.aboutText}>
            MediConnect is a revolutionary pharmacy mobile application designed to simplify 
            pharmacy services while encouraging healthier lifestyles. We bridge the gap between 
            traditional pharmacy services and modern digital convenience.
          </Text>
          <Text style={styles.aboutText}>
            Our mission is to create a simple, user-friendly platform that connects pharmacies 
            with their customers while fostering long-term wellness in the community.
          </Text>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Features</Text>
          <View style={styles.featuresGrid}>
            {features.map(item => (
              <View key={item.id} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <MaterialIcons name={item.icon} size={28} color="#7226ff" />
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Us Section */}
        <LinearGradient
          colors={['#0033FF', '#977DFF']}
          style={styles.contactSection}
        >
          <Text style={styles.sectionTitleWhite}>Contact Us</Text>
          <Text style={styles.contactIntro}>
            Have questions or need assistance? We're here to help you!
          </Text>
          
          <View style={styles.contactMethods}>
            {contactMethods.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.contactCard}
                onPress={() => Linking.openURL(item.action)}
              >
                <MaterialIcons name={item.icon} size={24} color="#fff" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTypeWhite}>{item.type}</Text>
                  <Text style={styles.contactValueWhite}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        {/* Footer */}
        <LinearGradient
          colors={['#7226ff', '#f042ff']}
          style={styles.footer}
        >
          <Text style={styles.footerText}>© 2025 MediConnect. All rights reserved.</Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeSection: {
    flex: 1,
  },
  greeting: {
    color: 'white',
    fontSize: 18,
    opacity: 0.9,
  },
  appName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  aboutSection: {
    padding: 25,
    margin: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    margin: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitleWhite: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  aboutText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#24C6DC',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  featureIconContainer: {
    backgroundColor: '#f0e6ff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  contactSection: {
    padding: 25,
    margin: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  contactIntro: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  contactMethods: {
    marginTop: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  contactInfo: {
    marginLeft: 15,
  },
  contactType: {
    fontSize: 14,
    color: '#7226ff',
    fontWeight: 'bold',
  },
  contactValue: {
    fontSize: 14,
    color: '#333',
  },
  contactTypeWhite: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  contactValueWhite: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Home;