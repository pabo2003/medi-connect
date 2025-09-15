import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert, FlatList, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

// Define TypeScript interfaces
interface UserData {
  name: string;
  email: string;
  phone: string;
  age: string;
  address: string;
}

interface FamilyMember {
  id: string;
  name: string;
  age: string;
  relationship: string;
  healthConditions: string[];
}

interface NewMember {
  name: string;
  age: string;
  relationship: string;
  healthConditions: string;
}

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  
  // User profile data - empty initially
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
  });

  // Family members data - empty initially
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  // New family member form
  const [newMember, setNewMember] = useState<NewMember>({
    name: "",
    age: "",
    relationship: "",
    healthConditions: "",
  });

  // Edit form state
  const [editForm, setEditForm] = useState<NewMember>({
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
  const handleInputChange = (field: keyof UserData, value: string): void => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  // Handle new member input changes
  const handleNewMemberChange = (field: keyof NewMember, value: string): void => {
    setNewMember({
      ...newMember,
      [field]: value
    });
  };

  // Handle edit form changes
  const handleEditFormChange = (field: keyof NewMember, value: string): void => {
    setEditForm({
      ...editForm,
      [field]: value
    });
  };

  // Save user data
  const saveUserData = () => {
    // Validate required fields
    if (!userData.name || !userData.email || !userData.phone) {
      Alert.alert("Error", "Please fill in all required fields (Name, Email, Phone)");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Validate phone number (basic validation)
    if (userData.phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    // Validate age
    const ageAsNumber = parseInt(userData.age);
    if (userData.age && (isNaN(ageAsNumber) || ageAsNumber < 0 || ageAsNumber > 150)) {
      Alert.alert("Error", "Please enter a valid age");
      return;
    }

    // Save data
    Alert.alert("Success", "Profile updated successfully!");
    setEditing(false);
  };

  // Add new family member
  const addFamilyMember = () => {
    if (!newMember.name || !newMember.age || !newMember.relationship) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newMemberObj: FamilyMember = {
      id: Date.now().toString(),
      name: newMember.name,
      age: newMember.age,
      relationship: newMember.relationship,
      healthConditions: newMember.healthConditions ? newMember.healthConditions.split(",").map(item => item.trim()) : [],
    };

    setFamilyMembers([...familyMembers, newMemberObj]);
    setNewMember({ name: "", age: "", relationship: "", healthConditions: "" });
    Alert.alert("Success", "Family member added successfully");
  };

  // Edit family member
  const editFamilyMember = (member: FamilyMember) => {
    setEditingMember(member);
    setEditForm({
      name: member.name,
      age: member.age,
      relationship: member.relationship,
      healthConditions: member.healthConditions.join(", "),
    });
    setIsEditModalVisible(true);
  };

  // Save edited family member
  const saveEditedMember = () => {
    if (!editingMember) return;

    if (!editForm.name || !editForm.age || !editForm.relationship) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const updatedMembers = familyMembers.map(member => 
      member.id === editingMember.id 
        ? {
            ...member,
            name: editForm.name,
            age: editForm.age,
            relationship: editForm.relationship,
            healthConditions: editForm.healthConditions ? editForm.healthConditions.split(",").map(item => item.trim()) : [],
          }
        : member
    );

    setFamilyMembers(updatedMembers);
    setIsEditModalVisible(false);
    setEditingMember(null);
    Alert.alert("Success", "Family member updated successfully");
  };

  // Delete family member
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
            setFamilyMembers(familyMembers.filter(member => member.id !== id));
            Alert.alert("Success", "Family member removed");
          }
        }
      ]
    );
  };

  // Render family member as table row
  const renderFamilyMember = ({ item }: { item: FamilyMember }) => (
    <View style={styles.memberRow}>
      {/* Name Column */}
      <View style={styles.column}>
        <Text style={styles.columnText}>{item.name}</Text>
      </View>
      
      {/* Age Column */}
      <View style={styles.column}>
        <Text style={styles.columnText}>{item.age} years</Text>
      </View>
      
      {/* Relationship Column */}
      <View style={styles.column}>
        <Text style={styles.columnText}>{item.relationship}</Text>
      </View>
      
      {/* Health Conditions Column */}
      <View style={[styles.column, styles.healthColumn]}>
        <Text style={styles.columnText} numberOfLines={2}>
          {item.healthConditions.join(", ") || "None"}
        </Text>
      </View>
      
      {/* Actions Column */}
      <View style={styles.actionsColumn}>
        <TouchableOpacity 
          style={styles.smallEditButton}
          onPress={() => editFamilyMember(item)}
        >
          <Ionicons name="pencil" size={16} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => deleteFamilyMember(item.id)}
        >
          <Ionicons name="trash" size={16} color="#ff3b30" />
        </TouchableOpacity>
      </View>
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
              onPress={() => editing ? saveUserData() : setEditing(true)}
            >
              <Text style={styles.editButtonText}>
                {editing ? "Save Changes" : "Edit Profile"}
              </Text>
            </TouchableOpacity>

            {/* Profile Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  value={userData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  editable={editing}
                  placeholder="Enter your full name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  value={userData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  editable={editing}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  value={userData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                  editable={editing}
                  keyboardType="phone-pad"
                  placeholder="Enter your phone number"
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
                  placeholder="Enter your age"
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
                  placeholder="Enter your address"
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
                placeholder="Full Name *"
                value={newMember.name}
                onChangeText={(text) => handleNewMemberChange("name", text)}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Age *"
                value={newMember.age}
                onChangeText={(text) => handleNewMemberChange("age", text)}
                keyboardType="numeric"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Relationship * (e.g., Spouse, Child)"
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

            {/* Family Members Table */}
            {familyMembers.length > 0 ? (
              <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <View style={styles.headerColumn}>
                    <Text style={styles.headerColumnText}>Name</Text>
                  </View>
                  <View style={styles.headerColumn}>
                    <Text style={styles.headerColumnText}>Age</Text>
                  </View>
                  <View style={styles.headerColumn}>
                    <Text style={styles.headerColumnText}>Relationship</Text>
                  </View>
                  <View style={[styles.headerColumn, styles.healthColumn]}>
                    <Text style={styles.headerColumnText}>Health Conditions</Text>
                  </View>
                  <View style={{ width: 80 }}>
                    <Text style={styles.headerColumnText}>Actions</Text>
                  </View>
                </View>
                
                {/* Table Body */}
                <FlatList
                  data={familyMembers}
                  renderItem={renderFamilyMember}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              </View>
            ) : (
              <View style={styles.emptyTable}>
                <Ionicons name="people-outline" size={48} color="#ccc" />
                <Text style={styles.emptyTableText}>No family members added yet</Text>
                <Text style={styles.emptyTableSubtext}>
                  Add family members using the form above to get started
                </Text>
              </View>
            )}
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

            <View style={styles.emptyTable}>
              <Ionicons name="document-outline" size={48} color="#ccc" />
              <Text style={styles.emptyTableText}>No prescriptions uploaded yet</Text>
              <Text style={styles.emptyTableSubtext}>
                Upload prescriptions to manage them here
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Edit Family Member Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Family Member</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={editForm.name}
              onChangeText={(text) => handleEditFormChange("name", text)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Age *"
              value={editForm.age}
              onChangeText={(text) => handleEditFormChange("age", text)}
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Relationship *"
              value={editForm.relationship}
              onChangeText={(text) => handleEditFormChange("relationship", text)}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Health Conditions (comma separated)"
              value={editForm.healthConditions}
              onChangeText={(text) => handleEditFormChange("healthConditions", text)}
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveEditedMember}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#7226ff',
    padding: 12,
  },
  headerColumn: {
    flex: 1,
  },
  headerColumnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  healthColumn: {
    flex: 1.5,
  },
  memberRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    paddingHorizontal: 4,
  },
  columnText: {
    fontSize: 14,
    color: '#333',
  },
  actionsColumn: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  smallEditButton: {
    padding: 6,
    backgroundColor: '#e6f2ff',
    borderRadius: 4,
  },
  deleteButton: {
    padding: 6,
    backgroundColor: '#ffe6e6',
    borderRadius: 4,
  },
  emptyTable: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyTableText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyTableSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#7226ff',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Account;