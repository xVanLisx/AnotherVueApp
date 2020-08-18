<template>
  <b-container class="mt-2">
    <h2>Registration Form</h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Your Name:">
        <b-form-input
          v-model="form.name"
          type="text"
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
          type="tel"
          required
          placeholder="Enter phone"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Are you...">
        <b-form-radio v-model="form.checking" name="some-radios" value="IN"
          >Checking In</b-form-radio
        >
        <b-form-radio v-model="form.checking" name="some-radios" value="OUT"
          >Checking Out</b-form-radio
        >
      </b-form-group>

      <b-form-group label="Your Table number:">
        <b-form-input
          v-model="form.table"
          required
          type="number"
          min="1"
          placeholder="Enter your table number:"
        ></b-form-input>
      </b-form-group>

      <b-button class="m-2" type="submit" variant="primary">Submit</b-button>
      <b-button class="m-2" type="reset" variant="danger">Reset</b-button>
    </b-form>
    <h5 v-if="totalRegistrations">
      There are {{ totalRegistrations }} registrations...
    </h5>
  </b-container>
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
        time: "",
        table: "",
        checking: "",
      },
      show: true,
      view: null,
      qid: null,
      logs: [],
      totalRegistrations: null,
    };
  },
  computed: {},

  async mounted() {
    // eslint-disable-next-line no-undef
    this.qid = await Bridge.View.getId();
    // eslint-disable-next-line no-undef
    this.view = new Zaza.View(this.qid);

    this.log = await this.view.downloadJSON("test.json");

    this.totalRegistrations = this.log.length;
  },
  methods: {
    clearForm() {
      this.form.email = "";
      this.form.name = "";
      this.form.phone = "";
      this.form.date = "";
      this.form.table = "";
      this.form.time = "";
      this.checking = "";
    },
    getFormattedDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      return dd + "/" + mm + "/" + yyyy;
    },
    getFormattedTime() {
      var today = new Date();
      var hh = String(today.getHours()).padStart(2, "0");
      var mm = String(today.getMinutes()).padStart(2, "0");
      var ss = String(today.getSeconds()).padStart(2, "0");
      return hh + ":" + mm + ":" + ss;
    },
    async onSubmit(evt) {
      evt.preventDefault();
      this.form.date = this.getFormattedDate();
      this.form.time = this.getFormattedTime();
      this.log = this.log.concat(this.form);
      var myFile = JSON.stringify(this.log);
      this.view
        .upload(myFile, "test.json")
        .then(() => {
          this.totalRegistrations++;
        })
        .catch((error) => {
          console.log(error);
        });
      this.clearForm();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.clearForm();

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
