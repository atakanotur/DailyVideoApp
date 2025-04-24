import { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { View, StyleProp, TextStyle, ViewStyle, Pressable } from 'react-native';

import { Text, Input } from '@/components/ui';

type ControlledInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    placeholder?: string;
    value?: string;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onChangeText?: (text: string) => void;
    defaultValue?: string | undefined;
    editable?: boolean;
};

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
    const [passwordVisible, setPasswordVisible] = useState<boolean>(!!secureTextEntry);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                    <View>
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder={error ? error.message : placeholder}
                            secureTextEntry={passwordVisible}
                            defaultValue={defaultValue}
                            editable={editable}
                            {...otherProps}
                        />
                        {(name === 'password' || name === 'confirmPassword') && (
                            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Text>{passwordVisible ? 'Show' : 'Hide'}</Text>
                            </Pressable>
                        )}
                    </View>
                </>
            )}
        />
    );
};

export default ControlledInput;
