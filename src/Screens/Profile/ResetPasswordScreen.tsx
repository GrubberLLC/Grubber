import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import NoMenuPageHeader from '../../Components/Headers/NoMenuPageHeader'
import { Activity, AlertCircle, Bell, Bookmark, ChevronsRight, Edit2, Grid, Heart, HelpCircle, Lock, LogOut, MessageSquare, User, X } from 'react-native-feather'
import { useAuth } from '../../Context/UserContext'
import ColorGuide from '../../ColorGuide'
import UserInputComponent from '../../Components/Inputs/UserInputComponent'
import MenuSubButtonComponent from '../../Components/Buttons/MenuSubButtonComponent'
import { useNavigation } from '@react-navigation/native'

const ResetPasswordScreen = () => {
  const navigation = useNavigation()

  const { userProfile, ResetUsersPasswordWithUsername, passwordReset } = useAuth()

  const [resetCode, setResetCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [verify, setVerify] = useState<string>('')

  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [matchingVerify, setMatchingVerify] = useState<boolean>(false)

  useEffect(() => {
    ResetUsersPasswordWithUsername(userProfile?.username)
  }, [])

  const handleResetCode = (text: string) => {
    setResetCode(text)
  }

  const handlePassword = (text: string) => {
    const isValidLength = text.length >= 8;
    const hasUpperCase = /[A-Z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    if (isValidLength && hasUpperCase && hasNumber) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
    if (text === verify) {
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setPassword(text)
  }

  const handleVerify = (text: string) => {
    if (text === password) {
      setMatchingVerify(true)
    } else {
      setMatchingVerify(false)
    }
    setVerify(text)
  }

  function anonymizeEmail(email: string) {
    const [localPart, domainPart] = email.split('@');
    const [domainName, topLevelDomain] = domainPart.split('.');

    const anonymizedLocalPart = localPart.length > 2
      ? `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart[localPart.length - 1]}`
      : localPart; // Handle edge case where localPart is too short to anonymize

    const anonymizedDomainName = domainName.length > 2
      ? `${domainName[0]}${'*'.repeat(domainName.length - 2)}${domainName[domainName.length - 1]}`
      : domainName; // Handle edge case where domainName is too short to anonymize

    return `${anonymizedLocalPart}@${anonymizedDomainName}.${topLevelDomain}`;
  }

  const handlePasswordReset = () => {
    if (matchingVerify && validPassword) {
      passwordReset(resetCode, password, navigation)
    } else {
      null
    }
  }

  return (
    <KeyboardAvoidingView
      className={'flex-1'}
      style={{ backgroundColor: ColorGuide['bg-dark'] }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Adjust this offset as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <NoMenuPageHeader backing={true} leftLabel='Reset Password' />
          <View className='flex-1 flex flex-col justify-between p-3'>
            <View></View>
            <View>
              <Text className='text-white text-2xl font-semibold'>Reset Password</Text>
              <Text className='text-white text-base my-3'>A reset code was sent to the email on the account {anonymizeEmail(userProfile?.email)}. Enter the confirmation code & new password below.</Text>
              <View className=''>
                <UserInputComponent
                  label='Hash'
                  value={resetCode}
                  handleFunction={handleResetCode}
                  secure={false}
                  placeholder='access code...'
                  multiline={false}
                />
                <UserInputComponent
                  label='Lock'
                  value={password}
                  handleFunction={handlePassword}
                  secure={true}
                  placeholder='new password'
                  multiline={false}
                />
                {
                  validPassword
                    ? null
                    : <Text>A_Z, a_z, 0-9, 8+ Chars</Text>
                }
                <UserInputComponent
                  label='Lock'
                  value={verify}
                  handleFunction={handleVerify}
                  secure={true}
                  placeholder='verify password'
                  multiline={false}
                />
                {
                  matchingVerify
                    ? null
                    : <Text>Password & Verify do not match</Text>
                }
              </View>
              <MenuSubButtonComponent justify='end' label='Reset Password' loading={false} handleFunction={handlePasswordReset} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ResetPasswordScreen
