import { useState } from 'react';
import { View, StyleProp, TextStyle, ViewStyle, Pressable } from 'react-native';
import { Text, Input } from '@/components/ui';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type ControlledInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    placeholder: string;
    value?: string;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>
    onChangeText?: ((text: string) => void)
    defaultValue?: string | undefined
    editable?: boolean
}

const ControlledInput = <TFieldValues extends FieldValues>({
    control,
    name,
    value,
    placeholder,
    secureTextEntry,
    style,
    containerStyle,
    onChangeText,
    defaultValue,
    editable,
    ...otherProps
}: ControlledInputProps<TFieldValues>) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(secureTextEntry ? true : false);
    const [selectionName, setSelectionName] = useState<string>("");
    const onFocus = () => setSelectionName(name);
    const onBlur = () => setSelectionName("");

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                console.log("error : ", error),
                <>
                    <View>
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder={error ? error.message : placeholder}
                            secureTextEntry={passwordVisible}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            defaultValue={defaultValue}
                            editable={editable}
                            {...otherProps}
                        />
                        {(name === 'password' || name === 'confirmPassword') &&
                            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Text>{passwordVisible ? "Show" : "Hide"}</Text>
                            </Pressable>}
                    </View>
                </>
            )}
        />
    );
};

export default ControlledInput;
