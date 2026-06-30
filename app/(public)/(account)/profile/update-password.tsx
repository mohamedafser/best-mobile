import ProfileHeader from "@/components/profile-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux";
import { showErrorToast } from "@/lib/utils/toast";
import {
  UpdatePasswordData,
  updatePasswordSchema,
} from "@/lib/validators/update-user";
import {
  updatePasswordThunk,
  verifyCurrentPasswordThunk,
} from "@/store/slice/update-user.slice";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

const UpdatePassword = () => {
  const [secure, setSecure] = useState(true);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: UpdatePasswordData) => {
    try {
      await dispatch(
        verifyCurrentPasswordThunk({
          current_password: data.currentPassword,
        }),
      ).unwrap();

      await dispatch(
        updatePasswordThunk({
          password: data.newPassword,
          password_confirmation: data.confirmNewPassword,
        }),
      ).unwrap();
    } catch (error: any) {
      showErrorToast(error || "Failed to update password");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ThemedView className="flex-1 px-4 py-6">
        <ProfileHeader />
        <ThemedText className=" font-semibold text-lg mb-4">
          Update Password
        </ThemedText>
        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Current Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={secure}
              placeholder="Enter your current password"
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#94a3b8"
                />
              }
              rightIcon={
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Ionicons
                    name={secure ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#94a3b8"
                  />
                </TouchableOpacity>
              }
              error={errors.currentPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="New Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={secure}
              placeholder="Enter your new password"
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#94a3b8"
                />
              }
              rightIcon={
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <Ionicons
                    name={secure ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#94a3b8"
                  />
                </TouchableOpacity>
              }
            />
          )}
        />
        <Controller
          control={control}
          name="confirmNewPassword"
          render={({ field: { onChange, value } }) => (
            <View className={"mb-4"}>
              <Input
                label="Confirm New Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={secure}
                placeholder="Confirm your new password"
                leftIcon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#94a3b8"
                  />
                }
                rightIcon={
                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Ionicons
                      name={secure ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                }
                error={errors.confirmNewPassword?.message}
              />
            </View>
          )}
        />

        <Button
          title="Update Password"
          size="md"
          fullWidth
          onPress={handleSubmit(onSubmit)}
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default UpdatePassword;
