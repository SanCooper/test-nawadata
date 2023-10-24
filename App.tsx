/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';

const App = () => {
  const [familyCount, setFamilyCount] = useState<number>(0);
  const [familySizesInput, setFamilySizesInput] = useState<string>('');
  const [busesNeeded, setBusesNeeded] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [sortedText, setSortedText] = useState<any>({
    vowels: '',
    consonants: '',
  });

  //Sort Characters
  const sortCharacters = (
    input: string,
  ): {vowels: string; consonants: string} => {
    const characters = input
      .replace(/[^a-zA-Z]/g, '')
      .toLowerCase()
      .split('');

    const vowels = characters
      .filter(char => 'aeiou'.includes(char))
      .sort()
      .join('');
    const consonants = characters
      .filter(char => !'aeiou'.includes(char))
      .sort()
      .join('');
    return {vowels, consonants};
  };

  const handleSort = () => {
    const sorted = sortCharacters(inputText);
    setSortedText(sorted);
  };

  //PSBB
  const totalBus = () => {
    const familySizes = familySizesInput.split(' ').map(Number);
    if (familyCount !== familySizes.length) {
      setErrorMessage('Input must be equal with the count of family');
    } else {
      const totalMembers = familySizes.reduce((acc, curr) => acc + curr, 0);
      // const busesNeeded = Math.ceil(totalMembers / 4);
      setBusesNeeded(Math.ceil(totalMembers / 4));
      setErrorMessage(null);
    }
  };

  return (
    <View style={{padding: 6, backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Logic Test
          </Text>
        </View>
        <View style={{borderWidth: 0.5, padding: 5, marginBottom: 20}}>
          <View style={{width: '100%', alignItems: 'center', marginBottom: 5}}>
            <Text style={{fontSize: 20, color: 'black'}}>Sort Character</Text>
          </View>
          <Text style={{color: 'black'}}>Input one line of words :</Text>
          <TextInput
            placeholder="Enter a line of words"
            value={inputText}
            placeholderTextColor={'grey'}
            style={{color: 'black'}}
            onChangeText={text => setInputText(text)}
          />
          <Button title="Sort" onPress={handleSort} />
          {sortedText.vowels && (
            <View style={{marginTop: 5}}>
              <Text style={{color: 'black'}}>Vowel Characters :</Text>
              <Text style={{color: 'black'}}>{sortedText.vowels}</Text>
            </View>
          )}
          {sortedText.consonants && (
            <View style={{marginTop: 5}}>
              <Text style={{color: 'black'}}>Consonant Characters :</Text>
              <Text style={{color: 'black'}}>{sortedText.consonants}</Text>
            </View>
          )}
        </View>
        <View style={{borderWidth: 0.5, padding: 5}}>
          <View style={{width: '100%', alignItems: 'center', marginBottom: 5}}>
            <Text style={{fontSize: 20, color: 'black'}}>PSBB</Text>
          </View>
          <Text style={{color: 'black'}}>Enter the number of families :</Text>
          <TextInput
            placeholder="Enter family count"
            keyboardType="numeric"
            placeholderTextColor={'grey'}
            style={{color: 'black'}}
            onChangeText={text => setFamilyCount(parseInt(text, 10))}
          />
          <Text style={{color: 'black'}}>
            Enter the sizes of each family (separated by a space) :
          </Text>
          <TextInput
            placeholder="Enter family sizes"
            keyboardType="numeric"
            placeholderTextColor={'grey'}
            style={{color: 'black'}}
            onChangeText={text => setFamilySizesInput(text)}
          />
          <Button title="Total Bus" onPress={totalBus} />
          <View style={{marginTop: 5}}>
            {errorMessage && (
              <Text style={{color: 'black'}}>{errorMessage}</Text>
            )}
            {busesNeeded !== null && !errorMessage && (
              <Text style={{color: 'black'}}>
                Minimum buses needed : {busesNeeded}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default App;
