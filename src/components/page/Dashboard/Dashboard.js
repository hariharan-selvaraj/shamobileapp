import React, { useState, useEffect } from 'react';
import {
    View, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity,
    Image, FlatList, Keyboard, Platform, Linking, TextInput, AppState
} from 'react-native';
const { width, height } = Dimensions.get("window");
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import Icons from 'react-native-vector-icons/FontAwesome5'
import { getMethod, postMethod } from '../../../services/Apiservices';
import { validateInputDashboard } from '../../componentfiles/validate';
import LoadingIndicator from '../../componentfiles/loadingindicator';
import Header from '../../componentfiles/header';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import axios from 'axios';
import CustomDropDown from '../../componentfiles/CustomDropDown';
import { debounce } from 'lodash';
import ApiList from '../../componentfiles/ApiList';
import Logout from '../../componentfiles/Logout';
import CustomText from '../../componentfiles/CustomText';
import UploadPhotoButton from '../../componentfiles/UploadPhotoButton';
const apiKey = 'AIzaSyAJ_1SJqwu9xYZ3lhYDVEZufWw0BAxYw20';
const maxLength = 200;
const zIndex = 3000;
const zIndexInverse = 1000;

const Dashboard = ({ }) => {
    const navigation = useNavigation();
    const { logoutConfirmation } = Logout();

    const [avatarSource, setavatarSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nameOpen, setnameOpen] = useState(false);
    const [nameValue, setnameValue] = useState(null);
    const [nameOpen1, setnameOpen1] = useState(false);
    const [nameValue1, setnameValue1] = useState(null);
    const [inputText, setInputText] = useState('');
    const [dropdowndata, setdropdowndata] = useState([])
    const [dropdowndata1, setdropdowndata1] = useState([])
    const [appState, setappState] = useState(AppState.currentState);

    React.useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (AppState.currentState == 'inactive') {
            // console.log('inactive USEEFFECT: ', AppState.currentState);
        }
        const appStateListener = AppState.addEventListener(
            'change',
            nextAppState => {
                // console.log('Next AppState is new check app state: ', nextAppState);
                if (nextAppState == 'active' || nextAppState == 'background') {
                    handleCheckPressed()
                    locationGet()
                }
                setappState(nextAppState)
            },
        );
        return () => { appStateListener?.remove(); };
    }, []);

    const getData = async () => {
        dropdownmethod()
        dropdownmethod1()
        handleCheckPressed()
        await locationGet()
    }

    const handleCheckPressed = debounce(() => {
        if (Platform.OS === 'android') {
            promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                .then(data => {
                    console.log("Success location enable ==>", data);
                    locationGet()
                })
                .catch(err => {
                    console.log("Failure Location ==> ", err); // An error occurred while trying to enable location services
                    if (err.code == "ERR00" || err.code == "ERR01" || err.code == "EUNSPECIFIED") {
                        handleCheckPressed();
                    }
                });
        }
    }, 1000);

    const locationGet = () => {
        requestLocationPermission()
    }

    const requestLocationPermission = async () => {
        var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        // console.log("response check ==>", response)
        if (response === 'granted') {
            await locateCurrentPosition();
        } else if (response === 'denied') {
            await requestLocationPermission();
        } else if (response === 'blocked') {
            await handleBlockedPermission();
        }
    };

    const handleBlockedPermission = () => {
        if (Platform.OS === 'android') {
            Linking.openSettings();
        } else {
            console.log("Please enable location permission manually in app settings.");
        }
    };

    const locateCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log('Latitude : ' + latitude + ' Longitude : ' + longitude);
                    resolve(position);
                    // await getGeocodingData(location.latitude,location.longitude, apiKey)
                },
                error => {
                    console.log(error.message);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        });
    };

    const getGeocodingData = async (latitude, longitude, apiKey) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            // console.log('response: ===> ', response);
            if (response.data.results.length > 0) {
                const address = response.data.results[0].formatted_address;
                return address;
            } else {
                return 'Address not found';
            }
        } catch (error) {
            return null;
        }
    };

    const dropdownmethod1 = async () => {
        await getMethod(ApiList.photoType).then(async (res) => {
            // console.log('photoType ===>', JSON.stringify(res));
            if (res.data.success == 1) {
                var details = [];
                Promise.all(
                    res.data.data.map(item => {
                        details.push({ label: item.PhotoType, value: item.PhotoTypeId });
                    }),
                );
                setdropdowndata1(details);
            }
        }).catch((error) => {
            // console.log("false----->", error)
            let responseJson = error;
        });

    }

    const dropdownmethod = async () => {
        await getMethod(ApiList.projectType).then(async (res) => {
            // console.log('projectType ===>', JSON.stringify(res));
            if (res.data.success == 1) {
                var details = [];
                Promise.all(
                    res.data.data.map(item => {
                        details.push({ label: item.ProjectType, value: item.ProjectTypeId });
                    }),
                );
                setdropdowndata(details);
            }
        }).catch((error) => {
            let responseJson = error;
        });
    }

    const handleTextChange = (text) => {
        if (text.length <= maxLength) {
            setInputText(text);
        }
    };

    // Upload photo from camera
    const openCamera = async () => {
        try {
            setIsLoading(true);
            const result = await ImagePicker.openCamera({
                width: 300,
                height: 400,
            });
            const position = await locateCurrentPosition();
            if (result) {
                setavatarSource([...avatarSource, {
                    uri: result.path, type: 'image/jpeg',
                    name: result.path,
                    base64: result.modificationDate,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }]);
            }
            // console.log("Camera image ==>", avatarSource)
        } catch (error) {
            console.log('Error opening camera:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Remove image
    const removeSelectedPostImage = (index) => {
        let imageArray = [...avatarSource]
        imageArray.splice(index, 1)
        setavatarSource(imageArray)
    }

    // Submit method
    const ImageUploadCheck = async () => {
        Keyboard.dismiss();
        const validationMessage = validateInputDashboard(nameValue, nameValue1, inputText, avatarSource)
        if (validationMessage) {
            Toast.show(validationMessage, Toast.LONG);
        } else {
            const formData = new FormData();
            for (let index = 0; index < avatarSource.length; index++) {
                formData.append('photos', avatarSource[index])
                formData.append('time', avatarSource[index].base64)
                formData.append('latitude', avatarSource[index].latitude)
                formData.append('longitude', avatarSource[index].longitude)
            }
            // console.log("All add product list ==> ", JSON.stringify(formData))
            // console.log("Api image check ==> ", ApiList.imageUploadApi)
            setIsLoading(true)
            await postMethod(ApiList.imageUploadApi, formData, {
                "Content-Type": "multipart/form-data"
            }).then(async (res) => {
                if (res.data.status == 200) {
                    SaveImageUpload(res.data.data)
                }
            }).catch((error) => {
                let responseJson = error;
                setIsLoading(false)
                if (responseJson.success == false) {
                    Toast.show(responseJson.message, Toast.LONG);
                } else {
                    Toast.show(responseJson.message, Toast.LONG);
                }
            });
        }
    }

    const SaveImageUpload = async (images) => {
        let LoginUserID = await AsyncStorage.getItem('UserID')
        let inputData = {
            "user_id": LoginUserID,
            "projectName": inputText,
            "projectTypeId": global.ProjectType,
            "photoTypeId": global.PhotoType,
            "image": images
        }
        setIsLoading(true)
        await postMethod(ApiList.tmCreateTM, inputData).then(async (res) => {
            // console.log('Success image save ===>', JSON.stringify(res));
            setIsLoading(false)
            if (res.data.success == 1) {
                Toast.show(res.data.message, Toast.LONG);
                setInputText('')
                setavatarSource([])
                setnameValue1('')
                setnameValue('')
            }
        }).catch((error) => {
            let responseJson = error;
            setIsLoading(false)
            if (responseJson.success == 0) {
                Toast.show(responseJson.message, Toast.LONG);
            }
        });
    }

    const [textInputHeight, setTextInputHeight] = useState(40); // Initial height
    const handleContentSizeChange = (contentWidth, contentHeight) => {
        const newHeight = contentHeight * 1.5;
        setTextInputHeight(newHeight);
    };

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ height: Height, width: Width, flex: 1 }}>
                    <Header onPress={() => navigation.openDrawer()} onPress1={() => logoutConfirmation(navigation)} label="Home" />

                    <CustomText>Project Type</CustomText>

                    <CustomDropDown
                        open={nameOpen}
                        value={nameValue}
                        items={dropdowndata}
                        setOpen={setnameOpen}
                        setValue={setnameValue}
                        setItems={setdropdowndata}
                        placeholder="Select Project Type"
                        onSelectItem={item => {
                            global.ProjectType = item.value;
                            console.log('Project Type----->', global.ProjectType);
                        }}
                    />

                    <CustomText>Photo Type</CustomText>

                    <CustomDropDown
                        open={nameOpen1}
                        value={nameValue1}
                        items={dropdowndata1}
                        setOpen={setnameOpen1}
                        setValue={setnameValue1}
                        setItems={setdropdowndata1}
                        placeholder="Select Photo Type"
                        onSelectItem={item => {
                            global.PhotoType = item.value;
                            console.log('Photo Type----->', global.PhotoType);
                        }}
                        zIndex={zIndex}
                        zIndexInverse={zIndexInverse}
                    />

                    <CustomText>Project Name</CustomText>

                    {/* Project Name TextInput */}
                    <TextInput
                        multiline
                        numberOfLines={4}
                        maxLength={maxLength}
                        value={inputText}
                        onChangeText={handleTextChange}
                        placeholder="Enter Your Project Name"
                        onContentSizeChange={(e) =>
                            handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)
                        }
                        style={{
                            height: textInputHeight, width: "90%", backgroundColor: "#F7F8F9", borderRadius: 5, borderColor: "#E8ECF4", borderWidth: 1, paddingLeft: 10,
                            marginLeft: 20, marginTop: 10
                        }}
                    />

                    <UploadPhotoButton avatarSource={avatarSource} openCamera={openCamera} />

                    {avatarSource.length != 0 && <View style={{ flex: 1 }}>
                        <FlatList
                            data={avatarSource}
                            numColumns={2}
                            nestedScrollEnabled
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        width: '45%',
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        borderWidth: 0.5,
                                        borderColor: 'black',
                                        marginTop: 10, marginLeft: 20
                                    }}>
                                        <Image key={index} source={{ uri: item.uri }} style={{
                                            width: '100%',
                                            aspectRatio: 1,
                                            resizeMode: 'cover'
                                        }} />
                                        <TouchableOpacity onPress={() => removeSelectedPostImage(index)}
                                            style={{ position: 'absolute', top: 0, end: -2, justifyContent: 'flex-end' }}>
                                            <FontAwesome name="close-circle"
                                                color={'#F05368'}
                                                style={{ alignSelf: 'flex-end' }}
                                                size={26} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    }
                    <TouchableOpacity
                        onPress={ImageUploadCheck}
                        style={{
                            width: '90%', height: Height / 100 * 6, backgroundColor: '#00FFFF', marginHorizontal: 20, marginTop: 10,
                            borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 20
                        }}>
                        <Text style={{ color: '#000000', fontSize: 22, fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
            {isLoading ? (<LoadingIndicator />) : null}
        </View>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
export default Dashboard;