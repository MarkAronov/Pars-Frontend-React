import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuth } from '../../../hooks/useAuth';
import TextInput from '../TextInputs/TextInput';
import { displayNameChecker, bioChecker } from '../../../funcs/checkers';
/**
 * The UserProfileEditDialog component
 * @param {object} props object file that contains all the needed props to
 *                       display the UserProfileEditDialog
 * @return {JSX.Element} returns a UserProfileEditDialog component
 */
const UserProfileEditDialog = React.memo(
  (props) => {
    const auth = useAuth();
    const { open, handleClose } = props;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const formKeys = [
      ['displayName', 'Display Name', false],
      ['bio', 'Bio ', true],
    ];
    const [data, setData] = useState(
      formKeys.reduce(
        (object, key) => ({
          ...object,
          [key[0]]: auth.user[key[0]],
        }),
        {}
      )
    );
    const [errors, setErrors] = useState(
      formKeys.reduce(
        (object, key) => ({
          ...object,
          [key[0]]: {
            state: false,
            message: null,
            data: null,
          },
        }),
        {}
      )
    );
    const [disabledUpdate, setDisabledUpdate] = useState(true);
    const [hasDataLoaded, setHasDataLoaded] = useState(true);
    const errorMap = {
      displayName: {
        state:
          displayNameChecker(data.displayName).length !== 0 &&
          data.displayName !== '',
        message: displayNameChecker(data.displayName),
      },
      bio: {
        state: bioChecker(data.bio).length !== 0 && data.bio !== '',
        message: bioChecker(data.bio),
      },
    };

    useEffect(() => {
      setDisabledUpdate(true);
      formKeys.forEach((key) => {
        setErrors((errors) => ({
          ...errors,
          [key[0]]: {
            ...errors[key[0]],
            state: false,
          },
        }));
      });
      const timeout = setTimeout(async () => {
        formKeys.forEach((key) => {
          setErrors((errors) => ({
            ...errors,
            [key[0]]: {
              ...errors[key[0]],
              state: errorMap[key[0]].state,
              message: errorMap[key[0]].message,
            },
          }));
        });

        setDisabledUpdate(false);
      }, 1000);

      return () => {
        setDisabledUpdate(false);
        clearTimeout(timeout);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleChange = (event) => {
      const { value, id } = event.target;
      setData((data) => ({ ...data, [id]: value }));
    };

    const handleSnackbarClose = (event) => {
      event.stopPropagation();
      setSnackbarOpen(false);
    };

    const handlePostEdit = async () => {
      setHasDataLoaded(false);
      const params = {};
      formKeys.forEach((key) => {
        if (data[key[0]] !== auth.user[key[0]]) {
          params[key[0]] = data[key[0]];
        }
      });
      const results = await auth.dispatch({
        type: 'updateUserData',
        updateType: 'regular',
        params,
      });
      setHasDataLoaded(true);

      if (results !== null && results !== undefined) {
        for (const key of Object.keys(results)) {
          if (results[key].length !== 0) {
            const msgArr = [];
            results[key].forEach((res) => msgArr.push(res[1]));
            setErrors((errors) => ({
              ...errors,
              [key]: {
                state: true,
                message: msgArr,
                data: data[key],
              },
            }));
          }
        }
        setDisabledUpdate(true);
      }
    };

    return (
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        scroll={'body'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{`User Info`}</DialogTitle>
        <DialogContent dividers={false}>
          {formKeys.map((value) => (
            <TextInput
              key={value}
              id={value[0]}
              label={value[1]}
              value={data[value[0]]}
              handleChange={handleChange}
              error={errors[value[0]].state}
              errorTextList={errors[value[0]].message}
              disabled={!hasDataLoaded}
              multiline={value[2]}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{`Cancel`}</Button>
          <LoadingButton
            id="update"
            disabled={
              disabledUpdate ||
              Object.keys(data).every((key) => data[key] === '') ||
              Object.keys(data).every((key) => data[key] === auth.user[key]) ||
              !Object.keys(errors).every((key) => !errors[key].state)
            }
            loading={!hasDataLoaded}
            onClick={handlePostEdit}
          >
            {'Update'}
          </LoadingButton>
        </DialogActions>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          severity="success"
          open={snackbarOpen && open}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {`Successfully updated your data!`}
          </Alert>
        </Snackbar>
      </Dialog>
    );
  },
  (prev, curr) => {
    console.log(prev, curr);
    return false;
  }
);

UserProfileEditDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
UserProfileEditDialog.displayName = 'User Profile Edit Dialog';

export default UserProfileEditDialog;
