import ProfileHeader from "@/components/profile-header";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { showErrorToast } from "@/lib/utils/toast";
import {
  UpdateUserInfoData,
  updateUserInfoSchema,
} from "@/lib/validators/update-user";
import {
  updateEmailThunk,
  updateNameThunk,
} from "@/store/slice/update-user.slice";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const C = Colors[colorScheme as "dark" | "light"];
  const router = useRouter();

  const { userProfile } = useAppSelector((state) => state.userProfile);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInfoData>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      firstName: userProfile?.first_name || "",
      lastName: userProfile?.last_name || "",
      email: userProfile?.email || "",
    },
  });

  const onSubmit = async (data: UpdateUserInfoData) => {
    const isNameChanged =
      data.firstName !== userProfile?.first_name ||
      data.lastName !== userProfile?.last_name;

    const isEmailChanged = data.email !== userProfile?.email;

    try {
      if (isNameChanged && isEmailChanged) {
        await dispatch(
          updateNameThunk({
            first_name: data.firstName,
            last_name: data.lastName,
          }),
        ).unwrap();

        await dispatch(
          updateEmailThunk({
            email: data.email,
          }),
        ).unwrap();

        return;
      }

      if (isNameChanged) {
        await dispatch(
          updateNameThunk({
            first_name: data.firstName,
            last_name: data.lastName,
          }),
        ).unwrap();
      }

      if (isEmailChanged) {
        await dispatch(
          updateEmailThunk({
            email: data.email,
          }),
        ).unwrap();
      }
    } catch (error: any) {
      showErrorToast(error || "Failed to update email");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: 65,
        paddingBottom: 48,
        backgroundColor: C.surfaceCard,
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ProfileHeader />

      <View>
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="First Name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="First name"
                  leftIcon={
                    <Ionicons name="person-outline" size={20} color="#94a3b8" />
                  }
                  error={errors.firstName?.message}
                />
              )}
            />
          </View>
          <View className="flex-1">
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Last Name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Last name"
                  leftIcon={
                    <Ionicons name="person-outline" size={20} color="#94a3b8" />
                  }
                  error={errors.lastName?.message}
                />
              )}
            />
          </View>
        </View>

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email Address"
              value={value}
              onChangeText={onChange}
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={
                <Ionicons name="mail-outline" size={20} color="#94a3b8" />
              }
              error={errors.email?.message}
            />
          )}
        />
      </View>

      {/* Password Row */}
      <View className="flex-row items-center justify-between py-4 mb-6">
        <View>
          <ThemedText className="font-semibold text-sm">Password</ThemedText>
          <Text className="text-xs mt-0.5" style={{ color: C.gray600 }}>
            Change your account password
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="px-4 py-2 rounded-xl"
          style={{ backgroundColor: C.brand50 }}
          onPress={() => {
            router.push("/profile/update-password");
          }}
        >
          <Text className="text-sm font-semibold" style={{ color: C.brand700 }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View className="gap-3">
        <Button
          title="Update"
          size="md"
          fullWidth
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
}
