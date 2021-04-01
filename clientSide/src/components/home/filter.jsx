import {
  Container,
  Typography,
  RadioGroup,
  FormLabel,
  Slider,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import "../../css/filter.css";
const Filter = ({
  age,
  km,
  rating,
  tag,
  sorted,
  setAge,
  setKm,
  setRating,
  setTag,
  setSorted,
  filterData,
  setPages,
}) => {
  // function pages() {
  //   setPages(0);
  // }
  return (
    <Container style={{ marginTop: "10px" }} maxWidth="md">
      <div className="filter">
        <FormLabel component="legend">Filter:</FormLabel>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexFlow: "row wrap",
          }}
        >
          <div style={{ width: "150px", padding: "0px 10px" }}>
            <Typography id="range-slider" gutterBottom>
              Rating:
            </Typography>
            <Slider
              min={0}
              max={5}
              value={rating}
              onChange={(e, newValue) => {
                setRating(newValue);
              }}
              valueLabelDisplay="auto"
              // aria-labelledby="range-slider"
              // getAriaValueText={valuetext}
            />
          </div>
          <div style={{ width: "150px", padding: "0px 10px" }}>
            <Typography id="range-slider" gutterBottom>
              Age:
            </Typography>
            <Slider
              value={age}
              onChange={(e, newValue) => {
                setAge(newValue);
              }}
              valueLabelDisplay="auto"
              // aria-labelledby="range-slider"
              // getAriaValueText={valuetext}
            />
          </div>
          <div style={{ width: "150px", padding: "0px 10px" }}>
            <Typography id="range-slider" gutterBottom>
              km:
            </Typography>
            <Slider
              min={0}
              max={12700}
              value={km}
              onChange={(e, newValue) => {
                setKm(newValue);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              // getAriaValueText={valuetext}
            />
          </div>
          <div style={{ width: "150px", padding: "0px 10px" }}>
            <Typography id="range-slider" gutterBottom>
              Tag:
            </Typography>
            <Slider
              min={0}
              max={5}
              value={tag}
              onChange={(e, newValue) => {
                setTag(newValue);
              }}
              valueLabelDisplay="auto"
              // aria-labelledby="range-slider"
              // getAriaValueText={valuetext}
            />
          </div>
        </div>
        <div>
          <FormLabel component="legend">Sorted By:</FormLabel>
          <RadioGroup
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexFlow: "row wrap",
            }}
            aria-label="gender"
            name="preferences"
            value={sorted}
            onChange={(e) => {
              setSorted(e.target.value);
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="Age" />
            <FormControlLabel value="2" control={<Radio />} label="Rating" />
            <FormControlLabel value="3" control={<Radio />} label="Tag" />
            <FormControlLabel value="4" control={<Radio />} label="location" />
          </RadioGroup>
        </div>
        <Button
          variant="outlined"
          color="primary"
          style={{ outlined: "center" }}
          onClick={() => {
            // pages();
            filterData();
          }}
        >
          Search
        </Button>
      </div>
    </Container>
  );
};

export default Filter;
