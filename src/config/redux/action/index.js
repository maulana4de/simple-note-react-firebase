import firebase, { database } from "../../firebase";

// login register
export const actionUserName = () => dispatch => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Ade Maulana" });
  }, 2000);
};

export const registerUserAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log("success", res);
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch(function(error) {
        // handle error here
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

// login action
export const loginUserAPI = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log("success", res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refereshToken: res.user.refereshToken
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch(function(error) {
        // handle error here
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

//
export const addDataToAPI = data => dispatch => {
  database.ref("/notes/" + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date
  });
};

// perbedaan .set (untuk memperbaharui tidak menambah data ) & .push (untuk menambah data baru)
