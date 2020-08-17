<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Your Name:">
        <b-form-input
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Email address:"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Your phone number:">
        <b-form-input
          v-model="form.phone"
          required
          placeholder="Enter phone"
        ></b-form-input>
      </b-form-group>

      <b-form-group label=" Chose date of today:">
        <b-form-input
          v-model="form.date"
          required
          placeholder="Enter date of today:"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Your Table number:">
        <b-form-input
          v-model="form.table"
          required
          placeholder="Enter your table number:"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        date: "",
        table: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.phone = "";
      this.form.date = "";
      this.form.table = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style></style>
