import React, { useState } from 'react';
import { View, Alert, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity, Image, FlatList, Keyboard, PermissionsAndroid, Linking } from 'react-native';
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
import { CustomHomeTextInput, validateInputHome } from '../../componentfiles/validate';
import LoadingIndicator from '../../componentfiles/loadingindicator';
import Header from '../../componentfiles/header';
import DropDownPicker from 'react-native-dropdown-picker';
// import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';

const home = ({ }) => {
    const navigation = useNavigation();
    const [avatarSource, setavatarSource] = useState([]);
    const [category, setCategory] = useState('');
    const [workID, setWorkID] = useState('');
    const [title, settitle] = useState('');

    const [previousWorkID, setpreviousWorkID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [nameOpen, setnameOpen] = useState(false);
    const [nameValue, setnameValue] = useState(null);

    const [nameOpen1, setnameOpen1] = useState(false);
    const [nameValue1, setnameValue1] = useState(null);

    const [dropdowndata, setdropdowndata] = useState([{
        "id": 1,
        "titile": 'SHA Project'
    },
    {
        "id": 2,
        "titile": 'TownCouncil Project'
    },
    {
        "id": 3,
        "titile": 'Other Works'
    }])

    const [dropdowndata1, setdropdowndata1] = useState([{
        "id": 1,
        "titile": 'Personal'
    },
    {
        "id": 2,
        "titile": 'Purchase'
    },
    {
        "id": 3,
        "titile": 'Delivery'
    },
    {
        "id": 4,
        "titile": 'Pickup/Dropup'
    },
    {
        "id": 3,
        "titile": 'Personal Office'
    }])

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        // GetworkOrderID()
        dropdownmethod()
        locationGet()
    }

    const locationGet = () => {
        requestLocationPermission()
    }

    const requestLocationPermission = async () => {
        try {
            const response = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            console.log("response==>", response)
            if (response === 'granted') {
                console.log('Permission granted');
                // Do something when permission is granted
                locateCurrentPosition();
            } else if (response === 'denied') {
                console.log('Permission denied');
                requestLocationPermission()
                // Handle denied permission (optional)
            } else if (response === 'never_ask_again') {
                console.log('Permission blocked');
                // Handle blocked permission (e.g., show a message to guide the user)
                showBlockedPermissionAlert();
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };

    const showBlockedPermissionAlert = async () => {
        Alert.alert(
            "Confirmation",
            "Please enable location permission in your device settings to use this feature.?",
            [
                {
                    text: "No",
                    onPress: () => requestLocationPermission1(),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => requestLocationPermission1() }
            ]
        );
    }

    const requestLocationPermission1 = () => {
        requestLocationPermission()
        // if (response === 'granted') {
        //     console.log('Permission granted');
        //     locateCurrentPosition();
        //   }
    }

    //   const showBlockedPermissionAlert = () => {
    //     Alert.alert(
    //       'Location Permission Blocked',
    //       'Please enable location permission in your device settings to use this feature.',
    //       [
    //         {
    //           text: 'OK',
    //           onPress: () => { Linking.openSettings();
    //             // Optionally, you can open the app settings to allow the user to manually enable the permission
    //             // Linking.openSettings(); // Uncomment this line if you want to open the app settings
    //           },
    //         },
    //       ]
    //     );
    //   };


    // const requestLocationPermission = async () => {
    //     console.log("4 ==>", response)
    //     // var response = await request(PermissionsAndroid.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //     const response = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //       );
    //     console.log("response check ==>", response)
    //     if (response === 'granted') {
    //         console.log("1 ==>", response)
    //         locateCurrentPosition();
    //     } else if (response === 'denied') {
    //         console.log("2 ==>", response)
    //         requestLocationPermission();
    //     }
    //     else {
    //         console.log("3 ==>", response)
    //         locationGet()
    //     }
    // };

    const locateCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    console.log('location check ==> ', location);
                    resolve(location);
                })
                .catch(error => {
                    const { code, message } = error;
                    reject(error);
                });
        });
    };


    // const locateCurrentPosition = () => {
    //     GetLocation.getCurrentPosition({
    //         enableHighAccuracy: true,
    //         timeout: 15000,
    //     })
    //         .then(location => {
    //             console.log('location check ==> ', location);
    //             setlatitude(location.latitude)
    //             // setlongitude(location.longitude)
    //             // // this.getAddress()
    //             // getAddress(location.latitude,location.longitude)
    //         })
    //         .catch(error => {
    //             const { code, message } = error;
    //         });
    // };

    const dropdownmethod = () => {
        var details = [];
        Promise.all(
            dropdowndata.map(item => {
                details.push({ label: item.titile, value: item.id });
            }),
        );
        setdropdowndata(details);
        console.log('usjijdijis', dropdowndata);

        var details1 = [];
        Promise.all(
            dropdowndata1.map(item => {
                details1.push({ label: item.titile, value: item.id });
            }),
        );
        setdropdowndata1(details1);
        console.log('usjijdijis', dropdowndata1);

    }

    const GetworkOrderID = async () => {
        await getMethod('workTransaction/workOrderTransaction').then(async (res) => {
            console.log('Success Work ID ===>', JSON.stringify(res.data.data[0].WorkID));
            if (res.data.success == 1) {
                setpreviousWorkID(res.data.data[0].WorkID)
            }
        }).catch((error) => {
            console.log("false----->", error)
            let responseJson = error;
        });
    }

    const imageUpload = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeBase64: true,
                compressImageQuality: 0.8,
                mediaType: 'photo'
            });
            console.log("Image select ==>", images)
            //Get current location
            const location = await locateCurrentPosition();
            images.forEach(image => {
                setavatarSource(prevImages => [...prevImages, {
                    uri: image.path, type: 'image/jpeg',
                    name: image.path,
                    base64: image.modificationDate,
                    latitude: location.latitude,
                    longitude: location.longitude,
                }]);
            });
            console.log("After image ==>", avatarSource)
        } catch (error) {
            console.error(error);
        }
    };

    const openCamera = async () => {
        try {
            const result = await ImagePicker.openCamera({
                width: 300,
                height: 400,
            });
            console.log("Camera image ==>", result)
            if (result) {
                setavatarSource([...avatarSource, {
                    uri: result.path, type: 'image/jpeg',
                    name: result.path,
                    base64: result.modificationDate
                }]);
                getLocation()
            }
        } catch (error) {
            console.log('Error opening camera:', error);
        }
    };

    // Function to get current location
    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                // const { latitude, longitude } = position.coords;
                // setLocation({ latitude, longitude });
                console.log("Get Live Location data ==> ", position);
            },
            (error) => {
                console.log('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const removeSelectedPostImage = (index) => {
        let imageArray = [...avatarSource]
        imageArray.splice(index, 1)
        setavatarSource(imageArray)
    }

    const logoutConfirmation = async () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to logout?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => logoutUser() }
            ]
        );
    }

    const logoutUser = async () => {
        AsyncStorage.clear();
        AsyncStorage.setItem('Customer', 'false');
        Toast.show('You have logged out successfully', Toast.LONG);
        navigation.replace('LoginScreen');
    }

    const ImageUploadCheck = async () => {
        Keyboard.dismiss();
        const validationMessage = validateInputHome(workID, category, avatarSource, title)
        if (validationMessage) {
            Toast.show(validationMessage, Toast.LONG);
        } else {
            const formData = new FormData();
            for (let index = 0; index < avatarSource.length; index++) {
                formData.append('photos', avatarSource[index])
                formData.append('time', avatarSource[index].base64)
            }
            console.log("All add product list ==> ", JSON.stringify(formData))
            setIsLoading(true)
            await postMethod('img/upload', inputData, {
                "Content-Type": "multipart/form-data"
            }).then(async (res) => {
                console.log('res===>', JSON.stringify(res.data.data));
                if (res.data.status == 200) {
                    SaveImageUpload(res.data.data)
                }
            }).catch((error) => {
                console.log("false----->", error)
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
            "workID": workID,
            "userId": LoginUserID,
            "categoryName": category,
            "remarks": title,
            "image": images
        }
        console.log("Check data ==>", inputData)
        setIsLoading(true)
        await postMethod('workTransaction/workOrder', inputData).then(async (res) => {
            console.log('Success image save ===>', JSON.stringify(res));
            setIsLoading(false)
            if (res.data.success == 1) {
                Toast.show(res.data.message, Toast.LONG);
                setWorkID('')
                setavatarSource([])
                setCategory('')
                GetworkOrderID()
            }
        }).catch((error) => {
            console.log("false----->", error)
            let responseJson = error;
            setIsLoading(false)
            if (responseJson.success == 0) {
                setWorkID('')
                Toast.show(responseJson.message, Toast.LONG);
            }
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ height: avatarSource.length != 0 ? Height * 1.5 : Height, width: Width, flex: 1 }}>
                    <Header onPress={() => navigation.openDrawer()} label="Home" />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: 5 }}>Previous Work ID : </Text>
                        <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold', marginLeft: 0, marginTop: 4 }}>{previousWorkID == null ? 0 : previousWorkID}</Text>
                    </View>

                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: 8 }}>Title</Text>

                    <View style={{ width: '90%', marginTop: '2%', marginLeft: 20 }}>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            style={{ width: width * 0.9, marginLeft: 0 }}
                            open={nameOpen}
                            value={nameValue}
                            items={dropdowndata}
                            setOpen={setnameOpen}
                            setValue={setnameValue}
                            setItems={setdropdowndata}
                            placeholder="Select Project Type"
                            // placeholderStyle={styles.placeholderStyles}
                            onSelectItem={item1 => {
                                console.log('schemesdkjfbdsif----->', item1.value);
                                // setamounto('');
                            }}
                        />
                    </View>

                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: 8 }}>Title</Text>

                    <View style={{ width: '90%', marginTop: '2%', marginLeft: 20 }}>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            style={{ width: width * 0.9, marginLeft: 0 }}
                            open={nameOpen1}
                            value={nameValue1}
                            items={dropdowndata1}
                            setOpen={setnameOpen1}
                            setValue={setnameValue1}
                            setItems={setdropdowndata1}
                            placeholder="Select Project Type Details"
                            // placeholderStyle={styles.placeholderStyles}
                            onSelectItem={item1 => {
                                console.log('schemesdkjfbdsif----->', item1.value);
                                // setamounto('');
                            }}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View>

                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: 8 }}>Work ID</Text>
                    {/* Category TextInput */}
                    <CustomHomeTextInput
                        placeholder='     Enter Your Work ID'
                        value={workID}
                        onChangeText={setWorkID}
                        keyboardType='numeric' />

                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: -5 }}>Category</Text>
                    {/* Category TextInput */}
                    <CustomHomeTextInput
                        placeholder='     Enter Your Category'
                        value={category}
                        onChangeText={setCategory}
                    />

                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: -5 }}>Title</Text>
                    {/* Category TextInput */}
                    <CustomHomeTextInput
                        placeholder='     Enter Your Ttile'
                        value={title}
                        onChangeText={settitle}
                    />

                    <TouchableOpacity onPress={() => openCamera()} style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 }}>Camera</Text>
                        <Icons size={30}
                            color="white"
                            name="camera-retro" style={{ marginLeft: '5%' }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => imageUpload()} style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 }}>Gallery</Text>
                        <Icons size={30}
                            color="white"
                            name="folder-open" style={{ marginLeft: '5%' }} />
                    </TouchableOpacity>

                    {avatarSource.length != 0 && <View style={{ flex: 1 }}>
                        <FlatList
                            data={avatarSource}
                            numColumns={2}
                            nestedScrollEnabled
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        width: '45%',
                                        // height: '100%',
                                        borderRadius: 8,
                                        overflow: 'hidden',
                                        borderWidth: 0.5,
                                        borderColor: 'black',
                                        marginTop: 20, marginLeft: 10
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
                    <TouchableOpacity onPress={ImageUploadCheck} style={{
                        width: '90%', height: Height / 100 * 6, backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 10,
                        borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: 'blue', fontSize: 22, fontWeight: 'bold' }}>Submit</Text>
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
export default home;