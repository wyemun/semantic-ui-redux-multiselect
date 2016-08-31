# semantic-ui-redux-multiselect
(Semantic UI) Multiselect dropdown to be used with redux-form. [See here.](http://semantic-ui.com/modules/dropdown.html#multiple-selection)

## Introduction
To implement Semantic UI's [Multiple Search Selection](http://semantic-ui.com/modules/dropdown.html#multiple-selection) with awesome erikras's  [Redux Form](https://github.com/erikras/redux-form).

## Usage
```javascript
    import { Field } from 'redux-form'
    import MultiSelect from 'path/to/MultiSelect.jsx'
    ...
    <Field name='tags' component={MultiSelect}  options={['Puppy', 'Pupper', 'Small doggor']} placeholder='Enter cute animals... '/>
```

## Dependencies
- ReactJS
- [Redux Form](https://github.com/erikras/redux-form)
- [Semantic UI](http://semantic-ui.com/)

## What's missing
- Transition animations
- html classes customizations
