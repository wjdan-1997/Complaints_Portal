import FormControlLabel from '@mui/material/FormControlLabel';
import { Field } from 'react-final-form';
import Checkbox from '@mui/material/Checkbox';

const CheckBoxField = (props) => {

    return (
        <FormControlLabel
            label={props.label}
            control={
                <Field
                    name={props.name}
                    required={props.required}
                    component={Checkbox}
                    type="checkbox"
                />
            }
        />
    )
}

export default CheckBoxField