import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";

import GlobalStyles from "../global/styles/styles";
import CreateModal from "./Modal";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useReviews } from "../context/ReviewsContext";
import { IReview } from "../context/ReviewsContext";

function HomeScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { reviews, setReviews } = useReviews();
  const [modalVisible, setModalVisible] = useState(false);

  const addNew = (item: IReview) => {
    setReviews([...reviews, item]);
  };

  const handleDelete = (id: number) => {
    Alert.alert("Thông báo", "Bạn muốn xoá?", [
      {
        text: "Huỷ",
        style: "cancel",
      },
      {
        text: "Xác nhận",
        onPress: () => {
          const updatedReviews = reviews.filter((item) => item.id !== id);
          setReviews(updatedReviews);
        },
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[GlobalStyles.globalFont, styles.title]}>Danh sách:</Text>

      <View style={styles.button}>
        <AntDesign
          name="plussquareo"
          size={60}
          color="black"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.frame}>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id + ""}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { ...item })}
              >
                <View style={styles.box}>
                  <View style={styles.itemBox}>
                    <Text style={[GlobalStyles.globalFont, styles.text]}>
                      {item.title}
                    </Text>

                    <View style={styles.remove}>
                      <Ionicons
                        name="remove"
                        size={40}
                        color="white"
                        onPress={() => handleDelete(item.id)}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addNew={addNew}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  frame: {
    flex: 1,
  },

  button: {
    marginHorizontal: 7.5,
    marginBottom: 22.5,
    alignItems: "center",
  },

  box: {
    backgroundColor: "grey",
    marginVertical: 5,
    marginHorizontal: 7.5,
    justifyContent: "center",
  },

  itemBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },

  title: {
    fontSize: 40,
    padding: 15,
    fontWeight: "700",
  },

  text: {
    fontSize: 20,
    color: "white",
    paddingVertical: 10,
    marginLeft: 5,
  },

  remove: {
    width: 40,
    height: 40,
  },
});
