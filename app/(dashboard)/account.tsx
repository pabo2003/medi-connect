import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face");
  
  // User profile data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    age: "35",
    address: "123 Health Street, Medical City",
  });

  // Family members data
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: "1",
      name: "Sarah Doe",
      age: "32",
      relationship: "Spouse",
      healthConditions: ["None"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Emma Doe",
      age: "8",
      relationship: "Daughter",
      healthConditions: ["Asthma", "Allergies"],
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
    },
  ]);

  // New family member form
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    relationship: "",
    healthConditions: "",
  });

  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Handle input changes
interface UserData {
    name: string;
    email: string;
    phone: string;
    age: string;
    address: string;
}

const handleInputChange = (field: keyof UserData, value: string): void => {
    setUserData({
        ...userData,
        [field]: value,
    });
};

  // Handle new member input changes
interface NewMember {
    name: string;
    age: string;
    relationship: string;
    healthConditions: string;
}

const handleNewMemberChange = (field: keyof NewMember, value: string): void => {
    setNewMember({
        ...newMember,
        [field]: value
    });
};

  // Add new family member
  const addFamilyMember = () => {
    if (!newMember.name || !newMember.age || !newMember.relationship) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newMemberObj = {
      id: Date.now().toString(),
      name: newMember.name,
      age: newMember.age,
      relationship: newMember.relationship,
      healthConditions: newMember.healthConditions ? newMember.healthConditions.split(",") : [],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    };

    setFamilyMembers([...familyMembers, newMemberObj]);
    setNewMember({ name: "", age: "", relationship: "", healthConditions: "" });
    Alert.alert("Success", "Family member added successfully");
  };

  // Delete family member
interface FamilyMember {
    id: string;
    name: string;
    age: string;
    relationship: string;
    healthConditions: string[];
    image: string;
}

const deleteFamilyMember = (id: string): void => {
    Alert.alert(
        "Confirm Delete",
        "Are you sure you want to remove this family member?",
        [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Delete", 
                style: "destructive",
                onPress: () => {
                    setFamilyMembers(familyMembers.filter((member: FamilyMember) => member.id !== id));
                    Alert.alert("Success", "Family member removed");
                }
            }
        ]
    );
};

  // Render family member item
  const renderFamilyMember = ({ item }: { item: { id: string; name: string; age: string; relationship: string; healthConditions: string[]; image: string; } }) => (
    <View style={styles.memberCard}>
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberDetails}>{item.age} years • {item.relationship}</Text>
        {item.healthConditions.length > 0 && (
          <Text style={styles.healthConditions}>
            Health: {item.healthConditions.join(", ")}
          </Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteFamilyMember(item.id)}
      >
        <Ionicons name="trash" size={20} color="#ff3b30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#7226ff', '#f042ff']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Account</Text>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "profile" && styles.activeTab]}
          onPress={() => setActiveTab("profile")}
        >
          <Text style={[styles.tabText, activeTab === "profile" && styles.activeTabText]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "family" && styles.activeTab]}
          onPress={() => setActiveTab("family")}
        >
          <Text style={[styles.tabText, activeTab === "family" && styles.activeTabText]}>
            Family ({familyMembers.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "prescriptions" && styles.activeTab]}
          onPress={() => setActiveTab("prescriptions")}
        >
          <Text style={[styles.tabText, activeTab === "prescriptions" && styles.activeTabText]}>
            Prescriptions
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {activeTab === "profile" && (
          <View style={styles.profileSection}>
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
              <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
                <Ionicons name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Edit Button */}
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setEditing(!editing)}
            >
              <Text style={styles.editButtonText}>
                {editing ? "Save Changes" : "Edit Profile"}
              </Text>
            </TouchableOpacity>

            {/* Profile Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={userData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  editable={editing}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={userData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  editable={editing}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={userData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                  editable={editing}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  value={userData.age}
                  onChangeText={(text) => handleInputChange("age", text)}
                  editable={editing}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={userData.address}
                  onChangeText={(text) => handleInputChange("address", text)}
                  editable={editing}
                  multiline
                />
              </View>
            </View>
          </View>
        )}

        {activeTab === "family" && (
          <View style={styles.familySection}>
            <Text style={styles.sectionTitle}>Family Members</Text>
            
            {/* Add Family Member Form */}
            <View style={styles.addMemberForm}>
              <Text style={styles.formTitle}>Add New Family Member</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={newMember.name}
                onChangeText={(text) => handleNewMemberChange("name", text)}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={newMember.age}
                onChangeText={(text) => handleNewMemberChange("age", text)}
                keyboardType="numeric"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Relationship (e.g., Spouse, Child)"
                value={newMember.relationship}
                onChangeText={(text) => handleNewMemberChange("relationship", text)}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Health Conditions (comma separated)"
                value={newMember.healthConditions}
                onChangeText={(text) => handleNewMemberChange("healthConditions", text)}
                multiline
              />
              
              <TouchableOpacity style={styles.addButton} onPress={addFamilyMember}>
                <Text style={styles.addButtonText}>Add Family Member</Text>
              </TouchableOpacity>
            </View>

            {/* Family Members List */}
            <FlatList
              data={familyMembers}
              renderItem={renderFamilyMember}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No family members added yet.</Text>
              }
            />
          </View>
        )}

        {activeTab === "prescriptions" && (
          <View style={styles.prescriptionsSection}>
            <Text style={styles.sectionTitle}>Prescriptions</Text>
            
            <View style={styles.prescriptionCard}>
              <Text style={styles.prescriptionTitle}>Upload Prescriptions</Text>
              <Text style={styles.prescriptionDescription}>
                Upload prescriptions for yourself or your family members. We'll keep them organized and easily accessible.
              </Text>
              
              <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload" size={24} color="#7226ff" />
                <Text style={styles.uploadButtonText}>Upload Prescription</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.comingSoon}>More prescription features coming soon...</Text>
          </View>
        )}
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
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#7226ff',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#7226ff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7226ff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#7226ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  familySection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  addMemberForm: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#7226ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  memberDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  healthConditions: {
    fontSize: 12,
    color: '#7226ff',
    fontStyle: 'italic',
  },
  deleteButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
  prescriptionsSection: {
    flex: 1,
  },
  prescriptionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  prescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  prescriptionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0e6ff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7226ff',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    color: '#7226ff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  comingSoon: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default Account;