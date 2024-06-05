import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemSubtitle: {
        fontSize: 16,
        color: '#555555',
    },
    bnt: {
        backgroundColor: "#3E3E3E",
        padding: 15,
        borderRadius: 5
    },
    bntText: {
        color: "white",
        fontSize: 25
    },
    actionSheetContainer: {
        width: "100%",
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    iconMinus: {
        position: "absolute",
        top: -25,
    },
    input: {
        width: "90%", 
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 20,
        fontSize: 15,
    },
    alertContainer: {
        padding: 25,
        width: "60%",
        height: "40%",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        textAlign: "center"
    },
    alertText: {
        fontSize: 27,
        fontWeight: "700",
        marginTop: 30,
        textAlign: "center",
    }
});

export default styles;
