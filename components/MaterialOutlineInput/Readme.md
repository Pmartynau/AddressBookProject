### Default

```js
<MaterialOutlineInput controlId="exampleLabelDefault" label="Example Label" />
```

### Default (with value)

```js
<MaterialOutlineInput
  defaultValue="Value"
  controlId="exampleLabelDefault"
  label="Example Label"
/>
```

### Default (Disabled)

```js
<MaterialOutlineInput
  disabled
  controlId="exampleLabelDis"
  label="Example Label"
/>
```

### Validation

Note that the validation styles of this component override the bootstrap styles for `.form-control.is-invalid` and `.form-control.is-valid`.

```js
import Form from 'react-bootstrap/Form';
<div>
  <Form.Group>
    <MaterialOutlineInput
      required
      invalidFeedback="This was invalid input"
      controlId="exampleLabelInvalid"
      label="Example Label"
      isInvalid
    />
  </Form.Group>
  <Form.Group>
    <MaterialOutlineInput
      required
      feedback="Look\'s Good!"
      controlId="exampleLabelValid"
      label="Example Label"
      isValid
    />
  </Form.Group>
</div>;
```

### Large

```js
<MaterialOutlineInput
  size="lg"
  controlId="exampleLabelLg"
  label="Example Label"
/>
```

### Small

```js
<MaterialOutlineInput
  size="sm"
  controlId="exampleLabelSm"
  label="Example Label"
/>
```
