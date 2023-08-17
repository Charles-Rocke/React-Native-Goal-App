/* Auto format shortcut
 * Shift + alt + f
 */
import { StyleSheet, TextInput, View, FlatList, Button } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
// import styles from "./styles"; can work as its own component

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }
  // add goal to list
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add new Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          handleAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onClose={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          {/* Flat list is scroll view but with perfomance optimization built in */}
          <FlatList
            keyExtractor={(item, index) => {
              return item.id;
            }}
            data={courseGoals}
            alwaysBounceVertical={false}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Max styles
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
