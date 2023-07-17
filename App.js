import { useState } from "react";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [todoGoals, setTodoGoals] = useState([]);

  //할 일 추가 모달을 띄워주는 함수
  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  //버튼을 누르면 할 일 목록을 추가하는 함수
  const addGoalHandler = (enteredGoalText) => {
    // console.log(enteredGoalText);

    // useState로 관리하는 상태 변수의 setter 안에 콜백 함수를 작성하면.
    //그 콜백 함수의 매개앖은 항상 해당 상태 변수의 최신 값이 전달된다.
    setTodoGoals((currentTodoGoals) => [
      ...currentTodoGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    console.log(todoGoals);
  };

  const deleteGoalHandler = (id) => {
    setTodoGoals((currentTodoGoals) => {
      return currentTodoGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <View style={styles.appContainer}>
      <Button
        title='할 일 추가하기!'
        color='#5e0acc'
        onPress={startAddGoalHandler}
      />
      {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />}
      <View style={styles.goalsContainer}>
        {/* Scrollview는 전체 화면이 렌더링 될 때 안의 항목들을 전부 렌더링 한다
            이로인해, 성능의 저하가 발생할 수 있다.
            (보이지 않는 영역까지 렌더링을 진행하기 때문에 목록이 많다면 로딩이 길어짐.)
            FlatList는 보이는 영역만 렌더링을 진행하고, 나머지 항목들은 스크롤 움직임이
            발생하면 렌더링을 진행한다.*/}
        <FlatList
          data={todoGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, //전체 영역을 모두 차지.
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 4, //  4/5 영역차지
  },
});
