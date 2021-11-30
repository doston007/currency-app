<script>
import { mapState } from "vuex";

import { Line } from "vue-chartjs";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
  extends: Line,
  mounted() {
    this.render();
  },
  computed: {
    ...mapState({
      from: (state) => state.from,
      to: (state) => state.to,
    }),
  },
  watch: {
    from() {
      this.render();
    },
    to() {
      this.render();
    },
  },
  methods: {
    render() {
      this.renderChart(
        {
          labels: this.data.map((i) => i.date),
          datasets: [
            {
              label: this.label,
              data: this.data.map((i) => i.devided),
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false }
      );
    },
  },
};
</script>
