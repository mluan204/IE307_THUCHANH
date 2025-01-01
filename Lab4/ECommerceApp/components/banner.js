import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

const image = [
  "https://i.pinimg.com/originals/f1/7e/0d/f17e0d810fe908952f94c292687b16e9.jpg",
  "https://i.pinimg.com/originals/3a/b8/d4/3ab8d4c2461f0c85260133fabb3cfb55.jpg",
  "https://i.pinimg.com/originals/bc/db/59/bcdb597a0e017d443f81ee38c896226b.jpg",
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-banner-template-design-f4bd3f84698d21014802a97a1b1540b9_screen.jpg?ts=1657339529",
];
// Thạch Minh Luân - 22520827
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function Banner() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Thạch Minh Luân - 22520827
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex === image.length) {
          scrollRef.current?.scrollTo({ x: 0, animated: false });
          nextIndex = 1;
          setTimeout(() => {
            scrollRef.current?.scrollTo({
              x: nextIndex * WIDTH,
              animated: true,
            });
          }, 1000);
        } else {
          scrollRef.current?.scrollTo({ x: nextIndex * WIDTH, animated: true });
        }
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  // Thạch Minh Luân - 22520827

  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        <ScrollView
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {[...image, image[0]].map((e, index) => (
            <Image
              key={index}
              resizeMode="stretch"
              style={styles.wrap}
              source={{ uri: e }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerChild: {
    borderWidth: 1,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
});
