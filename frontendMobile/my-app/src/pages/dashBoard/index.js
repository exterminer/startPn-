import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { SessionsContext } from "../../context/sessions.context";
import frame from "../../images/png/Frame.png";
import logo from "../../images/png/logo.png";
import elipse from "../../images/svg/ellipse.svg";
import chesIcon from "../../images/png/chessicon.png";
import userIcon from "../../images/svg/Bitmap.png";
import taskIcon from "../../images/png/tasksquare.png";
import messageIcon from "../../images/png/message.png";
import settingIcon from "../../images/png/setting.png";
import logOutIcon from "../../images/png/logout.png";
import { CategoriesContext } from "../../context/categories.context";
import HTMLView from "react-native-htmlview";
import { useNavigation } from "@react-navigation/native";
import AddCategoriesModal from "../../components/addCategoriesModal";
import fonts from "../../global/styles/fonts";
const DashBoard = () => {
  const { sessionsLogout } = useContext(SessionsContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    categories,
    getUserCategories,
    getCategoriesCards,
    cards,
    setAddCategoriesModal,
  } = useContext(CategoriesContext);

  const navigation = useNavigation();

  const toggleMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };
  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <TouchableOpacity
        onPress={() => {
          handleCategoryPress(item.id);
          getCategoriesCards(item.id);
        }}
        style={[
          styles.categoryItemButton,
          selectedCategory === item.id && styles.selectedCategory,
        ]}
      >
        <Text style={fonts.textCircularSmallBlueCategories}>{item.title}</Text>
      </TouchableOpacity>
      {selectedCategory === item.id && (
        <TouchableOpacity
          onPress={() => handleEditCategory(item.id)}
        ></TouchableOpacity>
      )}
    </View>
  );
  const renderCards = ({ item }) => (
    <View style={styles.cardContent}>
      <View style={styles.cardTitle}>
        <Text style={fonts.textCircularColorBlackBigCard}>{item.name}</Text>
        <TouchableOpacity style={styles.editCardButton}>
          <Text style={fonts.textCircularColorWhiteTitleCard}>Editar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <HTMLView value={item.text} />
      </View>
    </View>
  );
  return (
    <View style={styles.dashboardPageContainer}>
      <View style={styles.containerDashboard}>
        <View style={styles.headerDivDashBoard}>
          <TouchableOpacity
            onPress={() => toggleMenu()}
            style={styles.dropdownButton}
          >
            <Image source={frame} />
          </TouchableOpacity>
          <Image source={logo} />
          <Image source={userIcon} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.ellipseButtonContainer}
        onPress={() => navigation.navigate("createCard")}
      >
        <Image source={elipse} style={styles.ellipseButon} />
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>

      <View style={styles.centeredContainer}>
        <View style={styles.categoriesContainer}>
          <View style={styles.cateriesTitle}>
            <Text style={fonts.textCircularSmallBoldBlack}>Categorias</Text>
          </View>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategoryItem}
          />
          <TouchableOpacity
            style={styles.buttonAddCategory}
            onPress={() => setAddCategoriesModal(true)}
          >
            <Text
              style={[
                styles.addCategoryButton,
                fonts.textCircularSmallBlueCategories,
              ]}
            >
              + Adiconar categoria
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <FlatList data={cards} renderItem={renderCards} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openSideMenu}
        onRequestClose={() => toggleMenu()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menuContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 20,
              }}
            >
              <Image source={logo} />
              <TouchableOpacity onPress={() => toggleMenu()}>
                <Text style={fonts.textCircularSmallBlueCategoriesBold}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itensContainer}>
              <View style={styles.inconMenu}>
                <Image source={chesIcon} />
                <Text>Playbooks</Text>
              </View>
              <View style={styles.inconMenu}>
                <Image source={taskIcon} />
                <Text>Exemplos</Text>
              </View>
              <View style={styles.inconMenu}>
                <Image source={messageIcon} />
                <Text>Exemplos</Text>
              </View>
              <View style={styles.inconMenu}>
                <Image source={settingIcon} />
                <Text>Exemplos</Text>
              </View>
            </View>
            <View style={styles.inconMenu}>
              <TouchableOpacity
                style={{ flexDirection: "row", paddingRight: 10 }}
                onPress={() => sessionsLogout()}
              >
                <Image source={logOutIcon} />
                <Text>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <AddCategoriesModal />
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardPageContainer: {
    flex: 1,
  },
  containerDashboard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    borderRadius: 15,
    height: 145,
  },
  headerDivDashBoard: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  dropdownButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  itensContainer: {
    flexDirection: "column",
  },
  inconMenu: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContent: {
    width: "80%",
    paddingTop: 70,
    paddingLeft: 30,
    paddingBottom: 150,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  categoriesContainer: {
    width: "90%",
    paddingTop: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D7D7D7",
  },
  cateriesTitle: {
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    paddingBottom: 8,
    paddingHorizontal: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  centeredContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 17,
  },
  categoryItemText: {
    color: "#476EE6",
  },
  buttonAddCategory: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cardsContainer: {
    flex: 1,
  },
  cardContent: {
    borderWidth: 1,
    borderColor: "#d8d8d8",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  card: {
    padding: 10,
    overflow: "hidden",
  },
  cardTitle: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editCardButton: {
    backgroundColor: "#476EE6",
    padding: 10,
    borderRadius: 20,
    width: "20%",
    alignItems: "center",
  },
  ellipseButon: {
    backgroundColor: "#476EE6",
    borderRadius: 50,
  },
  ellipseButtonContainer: {
    position: "absolute",
    bottom: 40,
    right: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  plusText: {
    position: "absolute",
    color: "white",
    fontSize: 30,
  },
  categoryItemButton: {
    paddingVertical: 8,
    paddingHorizontal: 17,
  },
  selectedCategory: {
    backgroundColor: "#F7F9FB",
  },
  editIcon: {
    backgroundColor: "#F7F9FB",
  },
});

export default DashBoard;
