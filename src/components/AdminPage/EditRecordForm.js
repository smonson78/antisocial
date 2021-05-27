import React from 'react';
import PropTypes from 'prop-types';

import globals from '../globals';
import * as styles from './AdminPageStyles';

class EditRecordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formValues: props.formContent.reduce((acc, field) => {
        if (field.type === 'text') {
          acc[field.id] = field.value;
        } else if (field.type === 'file') {
          acc[field.id] = { name: field.value.filename, ext: field.value.ext, data: null };
        }
        return acc;
      }, {}),
    }
    this.fileRefs = {};
  }

  updateField = (id, value) => {
    const newFormValues = Object.assign({}, this.state.formValues);
    newFormValues[id] = value;
    this.setState({ formValues: newFormValues });
  }

  updateFileField = (id, value) => {
    const file = this.fileRefs[id].files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newFormValues = Object.assign({}, this.state.formValues);
      newFormValues[id] = {
        name: file.name,
        data: btoa(reader.result),
      };
      this.setState({ formValues: newFormValues });
      console.log('>>>', newFormValues);

    };
    reader.readAsBinaryString(file);
  }

  submit = () => {
    this.props.onSubmit(this.state.formValues);
  }

  makeFileField = (item) => {

    const field = this.state.formValues[item.id];

    const makeImageFilename = (thumbnail) => {
      if (thumbnail.data) {
        return `${this.props.thumbnailImageDir}/${field.name}`;
      }
      return `${this.props.thumbnailImageDir}/${field.name}_64x64${field.ext}`;
    };

    return (
      <div key={item.id} css={styles.formFieldContainer}>
        <label css={styles.formLabel}>
          <div>
            {item.label}
            <input
              css={styles.formFileInput}
              id={item.id}
              ref={ref => { this.fileRefs[item.id] = ref; }}
              type={item.type}
              onChange={event => this.updateFileField(item.id, event.target.value)}
            />
            <button
              css={styles.formFileClearButton}
              onClick={() => {
                const newFormValues = Object.assign({}, this.state.formValues);
                newFormValues[item.id] = { name: null };
                this.setState({ formValues: newFormValues });
              }}
            >
              Remove
            </button>
          </div>
        </label>
        <img
          css={styles.formLabelImageThumbnail}
          src={makeImageFilename(field)}
          alt={field.name}
        />
      </div>
    );
  };

  render() {

    console.log('>>> edit record form rendering', this.props.formContent);

    const fields = this.props.formContent.map(item => {
      if (item.type === 'file') {
        return this.makeFileField(item);
      } else {
        return (
          <div key={item.id} css={styles.formFieldContainer}>
            <label css={styles.formLabel}>
              <div>
                {item.label}
                {
                  item.type === 'text' && <input
                    css={styles.formInput}
                    id={item.id}
                    type={item.type}
                    value={this.state.formValues[item.id]}
                    onChange={event => this.updateField(item.id, event.target.value)}
                  />
                }
                {
                  item.type === 'file' && <input
                    css={styles.formFileInput}
                    id={item.id}
                    ref={ref => { this.fileRefs[item.id] = ref; }}
                    type={item.type}
                    onChange={event => this.updateFileField(item.id, event.target.value)}
                  />
                }
              </div>
            </label>
            {
              item.type === 'file' && <img
                css={styles.formLabelImageThumbnail}
                src={`${this.props.thumbnailImageDir}/${this.state.formValues[item.id].name}`}
                alt={this.state.formValues[item.id].name}
              />
            }
            {
              false && item.type === 'file' && <button
                css={styles.formFileClearButton}
                onClick={() => {
                  const newFormValues = Object.assign({}, this.state.formValues);
                  newFormValues[item.id] = { name: null };
                  this.setState({ formValues: newFormValues });
                }}
              >
                Remove
              </button>
            }
          </div>
        );
      }
    });

    return (
      <div css={styles.form}>
        <div css={styles.formHeading}>
          <button
            css={styles.formCloseButton}
            onClick={this.props.onClose}
          >
            <span role="img" aria-label="close button">&#x274c;</span>
          </button>
          <div css={styles.formTitle}>
            {this.props.title}
          </div>
        </div>

        <div css={styles.formBody}>
          {fields}
          <div>
            <button
              css={styles.formSubmit}
              onClick={this.submit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

EditRecordForm.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formContent: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'file']),
    value: PropTypes.string.isRequired,
  })),
  thumbnailImageDir: PropTypes.string,
};

EditRecordForm.defaultProps = {
  title: 'Edit Record',
  thumbnailImageDir: globals.imageUrlBase,
}

export default EditRecordForm;
