import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, StyleSheet, SectionList } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type Medicine = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
};

const MedicinesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Medicine categories
  const categories: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: "all", name: "All Medicines", icon: "medical" },
    { id: "pain", name: "Pain Relief", icon: "medkit" },
    { id: "vitamins", name: "Vitamins", icon: "nutrition" },
    { id: "cold", name: "Cold & Flu", icon: "thermometer" },
    { id: "skincare", name: "Skincare", icon: "body" },
    { id: "digestive", name: "Digestive", icon: "medical" },
  ];

  // Sample medicine data
  const medicines = [
    {
      id: "1",
      name: "Paracetamol 500mg",
      price: "$5.99",
      description: "Pain reliever and fever reducer",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop",
      category: "pain",
      inStock: true,
    },
    {
      id: "2",
      name: "Vitamin C 1000mg",
      price: "$8.49",
      description: "Immune system support",
      image: "https://images.unsplash.com/photo-1633849036897-c6cd8452c350?w=300&h=200&fit=crop",
      category: "vitamins",
      inStock: true,
    },
    {
      id: "3",
      name: "Ibuprofen 200mg",
      price: "$6.99",
      description: "Anti-inflammatory pain reliever",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
      category: "pain",
      inStock: true,
    },
    {
      id: "4",
      name: "Omega-3 Fish Oil",
      price: "$12.99",
      description: "Heart health supplement",
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=200&fit=crop",
      category: "vitamins",
      inStock: true,
    },
    {
      id: "5",
      name: "Cold & Flu Relief",
      price: "$9.99",
      description: "Multi-symptom cold medicine",
      image: "https://images.unsplash.com/photo-1576091160552-0e355a510e3d?w=300&h=200&fit=crop",
      category: "cold",
      inStock: false,
    },
    {
      id: "6",
      name: "Antacid Tablets",
      price: "$7.49",
      description: "Fast heartburn relief",
      image: "https://images.unsplash.com/photo-1550565116-3c5f271789d9?w=300&h=200&fit=crop",
      category: "digestive",
      inStock: true,
    },
    {
      id: "7",
      name: "Moisturizing Lotion",
      price: "$8.99",
      description: "For dry and sensitive skin",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop",
      category: "skincare",
      inStock: true,
    },
    {
      id: "8",
      name: "Multivitamin Complex",
      price: "$15.99",
      description: "Complete daily vitamin supplement",
      image: "https://images.unsplash.com/photo-1590502593745-0a9c9d4ef14a?w=300&h=200&fit=crop",
      category: "vitamins",
      inStock: true,
    }
  ];

  // Filter medicines based on selected category and search query
  const filteredMedicines = medicines.filter(medicine => {
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemSelected
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
    <Ionicons 
      name={item.icon} 
      size={24} 
      color={selectedCategory === item.id ? "#fff" : "#7226ff"} 
    />
    <Text style={[
      styles.categoryText,
      selectedCategory === item.id && styles.categoryTextSelected
    ]}>
      {item.name}
    </Text>
  </TouchableOpacity>
  );

  const renderMedicineItem = ({ item }: { item: Medicine }) => (
    <View style={styles.medicineCard}>
      <Image source={{ uri: item.image }} style={styles.medicineImage} />
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDescription}>{item.description}</Text>
        <Text style={styles.medicinePrice}>{item.price}</Text>
        <View style={styles.stockStatus}>
          <Ionicons 
            name={item.inStock ? "checkmark-circle" : "close-circle"} 
            size={16} 
            color={item.inStock ? "#4CAF50" : "#F44336"} 
          />
          <Text style={[
            styles.stockText,
            { color: item.inStock ? "#4CAF50" : "#F44336" }
          ]}>
            {item.inStock ? "In Stock" : "Out of Stock"}
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[
          styles.addButton,
          !item.inStock && styles.addButtonDisabled
        ]}
        disabled={!item.inStock}
      >
        <Ionicons name="add" size={24} color="#fff" />
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
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Medicines</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Search medicines..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Medicines List */}
        <View style={styles.medicinesSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "all" ? "All Medicines" : 
             categories.find(cat => cat.id === selectedCategory)?.name}
            <Text style={styles.resultsCount}> ({filteredMedicines.length} results)</Text>
          </Text>
          
          {filteredMedicines.length > 0 ? (
            <FlatList
              data={filteredMedicines}
              renderItem={renderMedicineItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.medicinesList}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>No medicines found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          )}
        </View>
      </View>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    marginBottom: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 12,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    minWidth: 100,
  },
  categoryItemSelected: {
    backgroundColor: '#7226ff',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    color: '#7226ff',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  medicinesSection: {
    flex: 1,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  medicinesList: {
    paddingBottom: 20,
  },
  medicineCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medicineImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  medicineInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicineDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7226ff',
    marginBottom: 6,
  },
  stockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 14,
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: '#7226ff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default MedicinesScreen;