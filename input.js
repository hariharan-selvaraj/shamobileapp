// // import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
// import {Divider, RadioButton, DataTable} from 'react-native-paper';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   Image,
//   Modal,
//   useColorScheme,
//   View,
//   Platform,
//   ActivityIndicator,
//   Keyboard,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import CheckBox from 'react-native-check-box';
// // import { KeyboardAwareScrollView } from "react-native-ui-lib";
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import {
//   form,
//   viewform,
//   updateamount,
//   viewaccount,
//   amount,
//   schemedetails,
//   schemegroupdetails,
//   schemeamountdetails,
//   newschemeAPI,
//   Selectedschemeapi,
// } from '../service.js/scheme';
// import Toast from 'react-native-simple-toast';
// import RadioGroup from 'react-native-radio-buttons-group';
// import {useNavigation, useRoute} from '@react-navigation/native';
// const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;
// const statusBarHeight = Platform.select({
//   ios: 20,
//   android: StatusBar.currentHeight,
// });

// const height = windowHeight - statusBarHeight;
// const Newscheme = () => {
//   const inputRef = useRef(null);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [id, setid] = useState();
//   const [getid, setgetid] = useState();
//   const [loading, setloading] = useState(false);
//   const [loading1, setloading1] = useState(false);

//   // const {Viewschemes} = route.params;

//   const [apidata, setApidata] = useState([]);
//   const [amountdata, setamountdata] = useState([]);
//   const [name, setname] = useState('');
//   const [ins, setins] = useState('');
//   const [code, setcode] = useState('');
//   const [amounto, setamounto] = useState('');
//   const [autoamt, setautoamt] = useState('');
//   const [bonus, setbonus] = useState('');
//   //  1 st ------>
//   const [data, setdata] = useState([]);
//   const [nameOpen, setnameOpen] = useState(false);
//   const [nameValue, setnameValue] = useState(null);

//   // 2nd droup down --->
//   const [groupOpen, setgroupOpen] = useState(false);
//   const [groupdata, setgroupdata] = useState([]);
//   const [apigroup, setApigroup] = useState([]);
//   const [groupValue, setgroupValue] = useState(null);

//   // nested dropdown ------>

//   const onnameOpen = useCallback(() => {
//     setgroupOpen(false);
//   }, []);

//   const ongroupOpen = useCallback(() => {
//     setnameOpen(false);
//   }, []);

//   // useState create kalai---->
//   const [namek, setnamek] = useState(null);
//   const [addressk, setaddressk] = useState(null);
//   const [address2k, setaddress2k] = useState(null);
//   const [cityk, setcityk] = useState(null);
//   const [pincodek, setpincodek] = useState(null);
//   const [mobilek, setmobilek] = useState(null);

//   // const [gender, setGender] = useState([
//   //     { label: "Male", value: "male" },
//   //     { label: "Female", value: "female" },
//   //     { label: "Prefer Not to Say", value: "neutral" },
//   //   ]);

//   const SchemeType = useMemo(
//     () => [
//       {
//         id: '1',
//         label: 'Amount',
//         value: 'Amount',
//         color: '#FFA500',
//       },
//       {
//         id: '2',
//         label: 'Weight',
//         value: 'Weight',
//         color: '#FFA500',
//       },
//     ],
//     [],
//   );

//   const Weight = useMemo(
//     () => [
//       {
//         id: '1',
//         label: 'Gold',
//         value: 'Gold',
//         color: '#FFA500',
//       },
//       {
//         id: '2',
//         label: 'Silver',
//         value: 'Silver',
//         color: '#FFA500',
//       },
//     ],
//     [],
//   );
//   const active = useMemo(
//     () => [
//       {
//         id: '1',
//         label: 'Yes',
//         value: 'Yes',
//         color: '#FFA500',
//       },
//       {
//         id: '2',
//         label: 'No',
//         value: 'No',
//         color: '#FFA500',
//       },
//     ],
//     [],
//   );
//   const headers = [
//     'Scheme Id',
//     'Scheme Name',
//     'No.of INS',
//     'Group Code',
//     'Scheme Type',
//   ];
//   const [typeId, setTypeId] = useState(null);
//   const [amountId, setamountId] = useState(null);
//   const [weightId, setweightId] = useState(null);
//   const [activeId, setactiveId] = useState(null);
//   const [appPay, setappPay] = useState(null);

//   // const { number } = route.params;

//   // dropdown dummy==============================>
//   // const [open, setOpen] = useState(false);
//   // const [value, setValue] = useState(null);
//   // const [items, setItems] = useState([
//   //   {label: 'Apple', value: 'apple'},
//   //   {label: 'Banana', value: 'banana'},
//   // ]);
//   // dropdown dummy==============================>

//   const handleinsChange = ins => {
//     console.log('weee', ins);
//     setins(ins);
//   };
//   const handlecodeChange = code => {
//     setcode(code);
//   };
//   const handleamountoChange = autoamt => {
//     setautoamt(autoamt);
//   };

//   const handlenamekChange = namek => {
//     setnamek(namek);
//   };

//   const handleaddresskChange = addressk => {
//     setaddressk(addressk);
//   };

//   const handleaddress2kChange = address2k => {
//     setaddress2k(address2k);
//   };

//   const handlecityChange = cityk => {
//     setcityk(cityk);
//   };

//   const handlepincodeChange = pincodek => {
//     setpincodek(pincodek);
//   };

//   const handlemobilekChange = mobilek => {
//     setmobilek(mobilek);
//   };

//   const handlenameChange = nameValue => {
//     // setnameValue(nameValue);
//     // apidata.map(res => {
//     //   if (res.SCHEMENAME === nameValue) {
//     //     setcode(res.SCHEME_ID);
//     //   }
//     // });
//     // console.log(nameValue, 'Scheme id');
//     console.log('schemeis1111111111111--->', nameValue);
//   };

//   const handlegroupChange = groupValue => {
//     setgroupValue(groupValue);
//     apigroup.map(res => {
//       if (res.SCHEMENAME === groupValue) {
//         setcode(res.GRPCODE);
//       }
//     });
//     console.log(groupValue, 'group id');
//   };
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const setview = () => {
//     setloading1(true);
//     viewaccount({})
//       .then(result => {
//         let apiResponse = result;
//         console.log(apiResponse);

//         if (apiResponse.success == '200') {
//           openModal();
//           setloading1(false);
//           Toast.show(apiResponse.message);
//           var details = [];
//           Promise.all(
//             apiResponse.data.map(item => {
//               details.push(item);
//             }),
//           );
//           setamountdata(details);
//           console.log('usjijdijis', data);
//           console.log('usjijdijis', data[0].ACTIVE);
//         } else {
//           Toast.show(apiResponse.message);
//           setloading1(false);
//         }
//       })
//       .catch(function () {
//         setloading1(false);
//       });
//   };


//   useEffect(() => {
//     console.log('sucessss----');
//     Value();
//   }, []);
//   const Value = async () => {
//     let useridAsync = await AsyncStorage.getItem('UserID');
//     console.log('UserID=>Done........>', useridAsync);
//   };


//   const setgo = async () => {

//     let useridAsync = await AsyncStorage.getItem('UserID');
//     console.log('yes', autoamt);
//     if (nameValue == null || nameValue == '' || nameValue == undefined) {
//       Toast.show('Please Fill Scheme');
//     } else if (
//       groupValue == null ||
//       groupValue == '' ||
//       groupValue == undefined
//     ) {
//       Toast.show('Please Fill groupcode');
//     } 
//     // else if (
//     //   autoamt.toString() == null ||
//     //   autoamt.toString() == '' ||
//     //   autoamt.toString() == undefined
//     // ) {
//     //   Toast.show('Please Fill the amount');
//     // } 
//     else if (namek == null || namek == '' || namek == undefined) {
//       Toast.show('Please Fill the name');
//     } else if (addressk == null || addressk == '' || addressk == undefined) {
//       Toast.show('Please Fill the Address');
//     } else if (address2k == null || address2k == '' || address2k == undefined) {
//       Toast.show('Please Fill the  secondAddress');
//     } else if (cityk == null || cityk == '' || cityk == undefined) {
//       Toast.show('Please Fill the  city name');
//     } else if (pincodek == null || pincodek == '' || pincodek == undefined) {
//       Toast.show('Please Fill the  pincode');
//     } else if (mobilek == null || mobilek == '' || mobilek == undefined) {
//       Toast.show('Please Fill the  mobile number');
//     } else if (activeId == null || activeId == '' || activeId == undefined) {
//       Toast.show('Please Select App Pay');
//     } else {
//       console.log(
//         'new scheme ===> ',
//         nameValue,
//         groupValue,
//         amounto,
//         autoamt,
//         namek,
//         addressk,
//         address2k,
//         cityk,
//         pincodek,
//         mobilek,
//         activeId == 'Yes' ? '1' : '2',
//         useridAsync
//       );
//       // Toast.show('save----->');
//       // setloading(true);
//       // console.log(code, activeId, amounto, name, 'details');

//       Selectedschemeapi(
//         nameValue,
//         groupValue,
//         amounto,
//         autoamt,
//         namek,
//         addressk,
//         address2k,
//         cityk,
//         pincodek,
//         mobilek,
//         activeId == 'Yes' ? '1' : '2',
//         useridAsync
//       )
//         .then(result => {
//           let apiResponse = result;
//           console.log('NewScheme api --->', apiResponse);

//           if (apiResponse.success == '200') {
//             Toast.show(apiResponse.message);
//             setnameValue(null);
//             setgroupValue(null);
//             setamounto('');
//             setautoamt('');
//             setnamek(null);
//             setaddressk(null);
//             setaddress2k(null);
//             setcityk(null);
//             setpincodek(null);
//             setmobilek(null);
//             setactiveId(null);
//             // setloading(false);
//           } else {
//             Toast.show(apiResponse.message);
//             setloading(false);
//           }
//         })
//         .catch(function () {
//           Toast.show('Something went wrong');
//           setloading(false);
//         });
//     }
//   };
//   const setupdatego = () => {
//     console.log('yes');
//     if (
//       nameValue == '' ||
//       code == '' ||
//       amounto == '' ||
//       activeId == undefined
//     ) {
//       Toast.show('Please Fill all Fields');
//     } else {
//       setloading(true);

//       updateamount({code, activeId, amounto, nameValue, id})
//         .then(result => {
//           let apiResponse = result;
//           console.log(apiResponse);

//           if (apiResponse.success == '200') {
//             Toast.show(apiResponse.message);
//             handlenameChange('');

//             handlecodeChange('');

//             setactiveId(null);
//             handleamountoChange('');

//             setloading(false);
//             setid(null);
//           } else {
//             Toast.show(apiResponse.message);
//             setloading(false);
//           }
//         })
//         .catch(function () {
//           Toast.show('Something went wrong');
//           setloading(false);
//         });
//     }
//   };

//   const setedit = (id, name, code, amounttu, act) => {
//     console.log(amounttu);
//     setid(id);
//     closeModal();

//     handlenameChange(name);

//     handlecodeChange(code);
//     handleamountoChange(amounttu);
//     console.log(amounto);
//     setactiveId(act == 'N' ? 'No' : 'Yes');
//   };

//   useEffect(() => {
//     console.log(typeId, 'sssa');
//     schemedetails({})
//       .then(result => {
//         let apiResponse = result;

//         console.log('schemedetails---->', apiResponse);

//         if (apiResponse.success == '200') {
//           setloading1(false);
//           // Toast.show(apiResponse.message);
//           var details = [];

//           Promise.all(
//             apiResponse.data.map(item => {
//               details.push({label: item.SCHEMENAME, value: item.SCHEME_ID});
//             }),
//           );
//           setdata(details);
//           console.log('usjijdijis', data);
//           console.log('usjijdijis', data[0].ACTIVE);
//         } else {
//           Toast.show(apiResponse.message);
//           setloading1(false);
//         }
//       })
//       .catch(function () {
//         setloading1(false);
//       });
//   }, []);

//   const groupschememethod = groupId => {
//     console.log('group id visble--->', groupId);
//     schemegroupdetails(groupId)
//       .then(result => {
//         let apiResponse = result;
//         console.log('groupdetails---->', apiResponse);
//         if (apiResponse.success == 200) {
//           setloading1(false);
//           var details = [];
//           Promise.all(
//             apiResponse.data.map(item => {
//               details.push({label: item.GRPCODE, value: item.GRPCODE});
//             }),
//           );
//           setgroupdata(details);
//           console.log('usjijdijis', groupdata);
//         } else if (apiResponse.success == 400) {
//           setgroupdata([]);
//         } else {
//           // Toast.show(apiResponse.message);
//           setloading1(false);
//         }
//       })
//       .catch(function () {
//         setloading1(false);
//       });
//   };

//   const getschemeAmount = groupId => {
//     console.log(
//       ' scheme gropuid amount  visble--->',
//       global.schemeIdNew,
//       groupId,
//     );
//     schemeamountdetails(global.schemeIdNew, groupId)
//       .then(result => {
//         let apiResponse = result;
//         console.log('amount details---->', apiResponse);
//         if (apiResponse.success == 200) {
//           setloading1(false);
//           global.amountType = apiResponse.data[0].AMOUNTTYPE;
//           console.log('amount details---->', global.amountType);
//           global.AMOUNT_CONVERTED = apiResponse.data[0].AMOUNT_CONVERTED;
//           setamounto(global.AMOUNT_CONVERTED);
//           setautoamt(global.AMOUNT_CONVERTED);
//         } else if (apiResponse.success == 400) {
//           // setgroupdata([]);
//         } else {
//           // Toast.show(apiResponse.message);
//           setloading1(false);
//         }
//       })
//       .catch(function () {
//         setloading1(false);
//       });
//   };

//   return (
//     <KeyboardAwareScrollView>
//       <View style={{alignContent: 'center', height: height}}>
//         <StatusBar backgroundColor={'#FFA500'} />

//         <View style={{alignContent: 'center', height: height}}>
//           <View style={styles.container}>
//             <Image style={styles.logo} source={require('../Images/agni.png')} />
//           </View>
//           <View style={styles.header}>
//             <Text style={styles.headertext}> New Scheme Entry</Text>
//           </View>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             {loading ? (
//               <ActivityIndicator size="small" color="#FFA500" />
//             ) : (
//               <View>
//                 <View style={styles.number}>
//                   <View style={styles.row}>
//                     <Text style={styles.numbertext}>Scheme Name</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <View style={{width: '90%', marginTop: '2%'}}>
//                     <DropDownPicker
//                       listMode="SCROLLVIEW"
//                       style={styles.dropdown}
//                       open={nameOpen}
//                       value={nameValue}
//                       items={data}
//                       setOpen={setnameOpen}
//                       setValue={setnameValue}
//                       setItems={setdata}
//                       placeholder="Select Scheme Name"
//                       placeholderStyle={styles.placeholderStyles}
//                       // onChangeValue={handlenameChange(data)}
//                       onSelectItem={item1 => {
//                         console.log('schemesdkjfbdsif----->', item1.value);
//                         setamounto('');
//                         global.schemeIdNew = item1.value;
//                         groupschememethod(item1.value);
//                       }}
//                       // zIndex={3000}
//                       // zIndexInverse={1000}
//                     />
//                   </View>
//                 </View>
//                 {/* dropdown 2========> */}
//                 <View style={styles.number1}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}> Group Code</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <View style={{width: '90%', marginTop: '2%'}}>
//                     <DropDownPicker
//                      listMode="SCROLLVIEW"
//                       style={styles.dropdown1}
//                       open={groupOpen}
//                       value={groupValue}
//                       items={groupdata}
//                       setOpen={setgroupOpen}
//                       setValue={setgroupValue}
//                       setItems={setgroupdata}
//                       placeholder="Select group Code"
//                       placeholderStyle={styles.placeholderStyles}
//                       // onChangeValue={handlegroupChange}

//                       onSelectItem={item1 => {
//                         console.log('schemesdkjfbdsif----->', item1.value);
//                         getschemeAmount(item1.value);

//                         // groupschememethod(item1);
//                       }}
//                       zIndex={3000}
//                       zIndexInverse={1000}
//                     />
//                   </View>
//                 </View>
//                 {/* dropdown2 end ------------ */}

//                 {/* rate   */}
//                 {global.amountType == 'Auto' ? (
//                   <View style={styles.number1}>
//                     <View style={styles.row1}>
//                       <Text style={styles.numbertext}> Rate</Text>
//                       <Text style={styles.mandritory}>*</Text>
//                     </View>

//                     <Text style={styles.inputrate}>{amounto}</Text>
//                     {/* <TextInput
//                     style={styles.input}
//                     onChangeText={handleamountoChange}
//                     value={amounto}
//                     placeholder="Amount"
//                     placeholderTextColor="#9E9E9E"
//                     keyboardType="numeric"
//                   /> */}
//                   </View>
//                 ) : (
//                   <View style={styles.number1}>
//                     <View style={styles.row1}>
//                       <Text style={styles.numbertext}> Rate</Text>
//                       <Text style={styles.mandritory}>*</Text>
//                     </View>
//                     <Text style={styles.inputrate}>{amounto}</Text>
//                   </View>
//                 )}

//                 {/* amount  */}
//                 {global.amountType == 'Auto' ? (
//                   <View style={styles.number1}>
//                     <View style={styles.row1}>
//                       <Text style={styles.numbertext}> Amount</Text>
//                       <Text style={styles.mandritory}>*</Text>
//                     </View>
//                     <TextInput
//                       style={styles.input}
//                       onChangeText={handleamountoChange}
//                       value={amount}
//                       placeholder=""
//                       placeholderTextColor="#9E9E9E"
//                       keyboardType="numeric"
//                     />
//                   </View>
//                 ) : (
//                   <View style={styles.number1}>
//                     <View style={styles.row1}>
//                       <Text style={styles.numbertext}> Amount</Text>
//                       <Text style={styles.mandritory}>*</Text>
//                     </View>

//                     <Text style={styles.inputrate}>{amounto}</Text>
//                   </View>
//                 )}
//                 {/* name  */}
//                 <View style={styles.number1}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}> Name</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     value={namek}
//                     setValue={setnamek}
//                     onChangeText={handlenamekChange}
//                     //   value={amounto}
//                     placeholder="Enter Name"
//                     placeholderTextColor="#9E9E9E"
//                   />
//                 </View>
//                 <View style={styles.number1}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}> Address1</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleaddresskChange}
//                     value={addressk}
//                     setValue={setaddressk}
//                     placeholder="Enter Address"
//                     placeholderTextColor="#9E9E9E"
//                   />
//                 </View>
//                 <View style={styles.number1}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}> Address2</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handleaddress2kChange}
//                     value={address2k}
//                     setValue={setaddress2k}
//                     placeholder="Enter Address2"
//                     placeholderTextColor="#9E9E9E"
//                   />
//                 </View>
//                 <View style={styles.number1}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}> City</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={handlecityChange}
//                     value={cityk}
//                     setValue={setcityk}
//                     placeholder="Enter City"
//                     placeholderTextColor="#9E9E9E"
//                   />
//                 </View>
//                 <View style={styles.number1}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}> Pincode</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     value={pincodek}
//                     setValue={setpincodek}
//                     onChangeText={handlepincodeChange}
//                     placeholder="Enter pincode"
//                     placeholderTextColor="#9E9E9E"
//                     keyboardType="number-pad"
//                     maxLength={6}
//                   />
//                 </View>
//                 <View style={styles.number1}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}>Mobile number</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     value={mobilek}
//                     setValue={setmobilek}
//                     onChangeText={handlemobilekChange}
//                     placeholder="Enter mobilenumber"
//                     placeholderTextColor="#9E9E9E"
//                     keyboardType="number-pad"
//                     maxLength={10}
//                   />
//                 </View>
//                 <View style={styles.radiospace}>
//                   <View style={styles.row1}>
//                     <Text style={styles.numbertext}>App Pay</Text>
//                     <Text style={styles.mandritory}>*</Text>
//                   </View>

//                   <View style={styles.row1}>
//                     <TouchableOpacity onPress={() => setactiveId('Yes')}>
//                       <View style={styles.row2}>
//                         <Text style={styles.radio}>
//                           {activeId === 'Yes' ? '◉' : '◯'}
//                         </Text>
//                         <Text style={styles.radiotext}>Yes</Text>
//                       </View>
//                     </TouchableOpacity>

//                     <View>
//                       <TouchableOpacity onPress={() => setactiveId('No')}>
//                         <View style={styles.row2}>
//                           <Text style={styles.radio}>
//                             {activeId === 'No' ? '◉' : '◯'}
//                           </Text>
//                           <Text style={styles.radiotext}>No</Text>
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//                 {/* <View style={styles.extra}></View> */}
//                 <View style={styles.button}>
//                   {id ? (
//                     <TouchableOpacity
//                       onPress={() => setupdatego()}
//                       style={styles.touch}>
//                       <Text style={styles.touchtext}>{'Update'}</Text>
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity
//                       onPress={() => setgo()}
//                       style={styles.touch}>
//                       <Text style={styles.touchtext}>{'Save'}</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//                 {/* <View style={styles.button}>
//                   <TouchableOpacity
//                     onPress={() => setview()}
//                     style={styles.touch}>
//                     <Text style={styles.touchtext}>View</Text>
//                   </TouchableOpacity>
//                 </View> */}


//               </View>
//             )}
//           </ScrollView>
//           <View style={styles.center}>
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={modalVisible}
//               onClose={closeModal}>
//               {loading1 ? (
//                 <ActivityIndicator size="small" color="#FFA500" />
//               ) : (
//                 <View style={styles.modalContainer}>
//                   <View style={styles.main}>
//                     <View style={styles.title}>
//                       <Text style={styles.viewtext}>View Scheme Amount</Text>
//                     </View>
//                     <View style={styles.close}>
//                       <TouchableOpacity onPress={closeModal}>
//                         <Image
//                           style={styles.closelogo}
//                           source={require('../Images/close.png')}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                   <ScrollView showsVerticalScrollIndicator={false}>
//                     <View>
//                       {amountdata &&
//                         amountdata.map((item, index) => (
//                           <View style={styles.remaining} key={index}>
//                             <ScrollView
//                               horizontal={true}
//                               showsHorizontalScrollIndicator={false}>
//                               <View style={styles.headertable}>
//                                 <View style={styles.table}>
//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       Scheme Id
//                                     </Text>
//                                   </View>
//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       Scheme Name
//                                     </Text>
//                                   </View>

//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       Group Code
//                                     </Text>
//                                   </View>
//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       Amount
//                                     </Text>
//                                   </View>

//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       Active
//                                     </Text>
//                                   </View>
//                                 </View>

//                                 <View style={styles.table1}>
//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       {item.SCHEMEID}
//                                     </Text>
//                                   </View>
//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       {item.SCHEMENAME}
//                                     </Text>
//                                   </View>

//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       {item.GRPCODE}
//                                     </Text>
//                                   </View>
//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       {item.AMOUNT}
//                                     </Text>
//                                   </View>

//                                   <View style={styles.cell}>
//                                     <Text style={styles.cellheader}>
//                                       {item.ACTIVE == 'N' ? 'No' : ' Yes'}
//                                     </Text>
//                                   </View>
//                                 </View>
//                               </View>

//                               {/* <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>Scheme Id</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.SCHEME_ID}</Text>
//                                                 </View>
//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>Scheme Name</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.SCHEMENAME}</Text>
//                                                 </View>
//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>No.of INS</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.Converted_NOINS}</Text>
//                                                 </View>
//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>Group Code</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.GRPCODE}</Text>
//                                                 </View>
//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>Scheme Type</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.SCHEMETYPE}</Text>
//                                                 </View>

//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>{item.SCHEMETYPE == "Weight" ? "Weight" : "Amount"}</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.SCHEMETYPE == "Weight" ? item.WEIGHTTYPE : item.AMOUNTTYPE}</Text>
//                                                 </View>
//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>Active</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.ACTIVE == "N" ? "No" : " Yes"}</Text>
//                                                 </View>
//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>Bonus</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.BONUS}</Text>
//                                                 </View>
//                                                 <View style={styles.rowview}>
//                                                     <Text style={styles.numbertextv}>Other Amount</Text>
//                                                     <Text style={styles.numbertextv}>:</Text>
//                                                     <Text style={styles.numbertextv}>{item.OTHERAMT}</Text>
//                                                 </View>
//                                                 <View style={styles.edit}>

//                                                     <TouchableOpacity onPress={() =>
//                                                         setedit(item.SCHEME_ID, item.SCHEMENAME, item.Converted_NOINS, item.GRPCODE, item.SCHEMETYPE, item.AMOUNTTYPE, item.WEIGHTTYPE, item.ACTIVE, item.BONUS, item.OTHERAMT)
//                                                     } style={styles.touch1}>
//                                                         <Text style={styles.touchtext1}>Edit</Text>
//                                                     </TouchableOpacity>



//                                                 </View>
//                                                 <View style={{ width: "100%", height: "7%" }}>
//                                                 </View>
//                                                 <Divider /> */}
//                             </ScrollView>
//                             <View style={styles.edit}>
//                               <TouchableOpacity
//                                 onPress={() =>
//                                   setedit(
//                                     item.AMTID,
//                                     item.SCHEMENAME,
//                                     item.GRPCODE,
//                                     item.AMOUNT,
//                                     item.ACTIVE,
//                                   )
//                                 }
//                                 style={styles.touch1}>
//                                 <Text style={styles.touchtext1}>Edit</Text>
//                               </TouchableOpacity>
//                             </View>
//                             <Divider style={{marginTop: '5%'}} />
//                           </View>
//                         ))}
//                     </View>
//                   </ScrollView>
//                 </View>
//               )}
//             </Modal>
//           </View>
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container1: {
//     padding: 15,
//     justifyContent: 'space-around',
//   },
//   container: {
//     width: windowWidth,
//     height: (windowHeight * 12) / 100,

//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   remaining: {
//     width: (windowWidth * 90) / 100,
//     height: (windowHeight * 32) / 100,
//   },
//   logo: {
//     width: (windowWidth * 45) / 100,
//     height: (windowHeight * 7.5) / 100,
//   },
//   edit: {
//     width: windowWidth,
//     height: (windowHeight * 6) / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   closelogo: {
//     width: (windowWidth * 5.7) / 100,
//     height: (windowHeight * 3) / 100,
//   },
//   header: {
//     alignItems: 'center',
//     justifyContent: 'center',

//     width: windowWidth,
//     height: (windowHeight * 6) / 100,
//   },
//   headertext: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'black',
//   },
//   viewtext: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: 'black',
//     textAlign: 'center',
//     marginLeft: '15%',
//   },
//   headertext1: {
//     fontSize: 14,
//     marginTop: '5%',
//     color: 'black',
//   },
//   number: {
//     width: windowWidth,
//     height: (windowHeight * 12) / 100,
//     marginTop: '2%',
//     marginLeft: '5%',
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: '2%',
//   },
//   rowview: {
//     flexDirection: 'row',
//     marginLeft: '5%',
//   },
//   number1: {
//     width: windowWidth,
//     height: (windowHeight * 11) / 100,
//     marginLeft: '5%',
//   },
//   extra: {
//     width: windowWidth,
//     height: (windowHeight * 20) / 100,
//   },
//   headertable: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '5%',

//     height: (windowHeight * 14) / 100,
//   },
//   table: {
//     width: (windowWidth * 200) / 100,
//     height: (windowHeight * 7) / 100,
//     borderWidth: 1,
//     flexDirection: 'row',
//     // backgroundColor:"blue"
//     // borderWidth: 0.5,
//     // borderColor: "black",
//     // marginBottom: 10,
//     // marginTop: 30,
//     // marginLeft: "1%"
//   },
//   table1: {
//     width: (windowWidth * 200) / 100,
//     height: (windowHeight * 7) / 100,
//     borderBottomWidth: 1,
//     borderRightWidth: 1,
//     borderLeftWidth: 1,
//     flexDirection: 'row',
//     // backgroundColor:"green"
//     // borderWidth: 0.5,
//     // borderColor: "black",
//     // marginBottom: 10,
//     // marginTop: 30,
//     // marginLeft: "1%"
//   },
//   rowtable: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   cellheader: {
//     textAlign: 'center',
//     fontSize: 14,
//     marginLeft: '4%',
//     color: 'black',
//   },
//   cell: {
//     flex: 0.6,
//     borderRightWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // padding: 10,
//     // borderWidth: 0.5,

//     // textAlign: "center",
//     // fontSize: 14,
//     // color: "black",
//     // borderColor: "black",
//   },
//   extra1: {
//     width: windowWidth,
//     height: (windowHeight * 0) / 100,
//   },
//   dropdown: {
//     width: (windowWidth * 90) / 100,
//     // backgroundColor:'yellow',
//   },
//   dropdown1: {
//     width: (windowWidth * 90) / 100,
//     // backgroundColor:'yellow',
//   },
//   row1: {
//     flexDirection: 'row',
//   },
//   numbertext: {
//     fontSize: 15,
//     fontWeight: '400',
//     color: 'black',
//   },
//   numbertextv: {
//     fontSize: 13,
//     fontWeight: '400',
//     color: 'black',
//     marginLeft: '2%',
//   },
//   mandritory: {
//     color: 'maroon',
//   },

//   input: {
//     width: (windowWidth * 90) / 100,
//     height: (windowHeight * 6) / 100,
//     color: 'black',
//     borderWidth: 0.5,
//     backgroundColor: 'white',
//     borderColor: 'grey',
//     borderRadius: 5,
//     marginTop: '2%',
//     alignItems: 'center',
//   },
//   inputrate: {
//     width: (windowWidth * 90) / 100,
//     height: (windowHeight * 6) / 100,
//     color: 'black',
//     borderWidth: 0.5,
//     borderColor: 'grey',
//     borderRadius: 5,
//   },

//   account: {
//     width: windowWidth,
//     height: (windowHeight * 20) / 100,

//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   accounttext: {
//     fontSize: 15,
//     fontWeight: '400',
//   },
//   column: {
//     flexDirection: 'row',
//   },
//   signup: {
//     textDecorationLine: 'underline',
//     color: 'maroon',
//   },
//   button: {
//     width: windowWidth,
//     height: (windowHeight * 8) / 100,

//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   touch: {
//     width: (windowWidth * 90) / 100,
//     height: (windowHeight * 6) / 100,
//     backgroundColor: '#FFA500',
//     borderRadius: 5,
//     elevation: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   touchtext: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: 'black',
//   },
//   row2: {
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//   },
//   touch1: {
//     width: (windowWidth * 20) / 100,
//     height: (windowHeight * 4) / 100,
//     backgroundColor: '#FFA500',
//     borderRadius: 5,
//     elevation: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: '-15%',
//     marginTop: '5%',
//   },
//   touchtext1: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: 'black',
//   },
//   check: {
//     marginTop: '5%',
//     color: 'blue',
//   },
//   normaltext: {
//     fontSize: 13,
//     color: 'grey',
//     marginTop: '5%',
//   },
//   sptext: {
//     fontSize: 13,
//     color: 'black',
//     textDecorationLine: 'underline',
//     marginTop: '5%',
//   },
//   radiospace: {
//     width: windowWidth,
//     height: (windowHeight * 8) / 100,
//     marginLeft: '5%',
//   },
//   radiospace1: {
//     width: windowWidth,
//     height: (windowHeight * 9) / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   radio: {
//     color: '#FFA500',
//     fontSize: 20,
//     marginLeft: '3%',
//     fontWeight: 'bold',
//   },
//   radiotext: {
//     marginTop: '3%',
//     fontSize: 16,
//     marginLeft: '3%',
//   },
//   sub: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: (windowWidth * 80) / 100,
//     height: (windowHeight * 8) / 100,
//     backgroundColor: 'white',
//     borderRadius: 10,
//   },
//   modalContainer: {
//     width: (windowWidth * 90) / 100,
//     height: (windowHeight * 90) / 100,

//     backgroundColor: 'white',
//     borderRadius: 15,
//     marginLeft: '5%',
//     marginTop: '5%',
//   },
//   main: {
//     width: (windowWidth * 80) / 100,
//     height: (windowHeight * 10) / 100,

//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     width: (windowWidth * 85) / 100,
//     height: (windowHeight * 10) / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   close: {
//     width: (windowWidth * 15) / 100,
//     height: (windowHeight * 10) / 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// export default Newscheme;

import React, { useState, useEffect } from 'react';
import { View, Keyboard, SafeAreaView, ScrollView, Dimensions } from 'react-native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';
import Header from './src/components/componentfiles/header';

const input = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ height: Height, width: Width, flex: 1 }}>
                    <View style={{ height: "20%", width: Width, flexDirection: "row" }}>
                        <Header onPress={() => navigation.openDrawer()} label="Home" />
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>

    );
};
export default input;