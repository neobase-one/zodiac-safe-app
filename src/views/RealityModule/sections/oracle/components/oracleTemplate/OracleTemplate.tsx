import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import { Dropdown } from "components/dropdown/Dropdown";
import React, { ChangeEvent, useState } from "react";
import { colors, ZodiacPaper, ZodiacTextField } from "zodiac-ui-components";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import { HelpOutline } from "@material-ui/icons";

const TEMPLATE_QUESTION = `Did the Snapshot proposal with the id {%s} in the weenus.eth space pass the execution of the array of Module transactions that have the hash 0x{%s} and does it meet the requirements of the document referenced in the dao requirements record at weenust.eth? The hash is the keccak of the concatenation of the individual EIP-712 hashes of the Module transactions. If this question was asked before the corresponding Snapshot proposal was resolved, it should ALWAYS be resolved to INVALID!`;

const CUSTOM_TEMPLATE_QUESTION = `Provide a custom question here. Use %s as a variable for the proposal id.`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textSubdued: {
    color: "rgba(255 255 255 / 70%)",
  },
  textFieldSmall: {
    "& .MuiFormLabel-root": {
      fontSize: 12,
    },
  },
  select: {
    border: "1px solid rgba(217, 212, 173, 0.3)",
  },
  paperTemplateContainer: {
    marginTop: 4,
    padding: theme.spacing(1),
    background: "rgba(0, 0, 0, 0.2)",
  },
  templateQuestion: {
    fontFamily: "Roboto Mono",
    "& .MuiInputBase-root": {
      border: "none",
      fontSize: "0.85rem",
    },
  },
  input: {
    "& .MuiInputBase-root": {
      padding: "9px 8px",
      borderColor: colors.tan[300],
      "&::before": {
        borderColor: colors.tan[300],
      },
    },
  },
  button: {
    width: "100%",
    padding: "4px 15px",
  },
  buttonContainer: {
    marginTop: 8,
    cursor: "pointer",
  },
  icon: {
    color: colors.tan[1000],
    fontSize: "1rem",
    marginTop: 3,
  },
  text: {
    fontSize: "0.75rem",
  },
  tooltipIcon: {
    fontSize: "1rem",
  },
}));

export const OracleTemplate: React.FC = () => {
  const classes = useStyles();
  const [template, setTemplate] = useState<string>("default");
  const [templateType, setTemplateType] = useState<string>("bool");
  const [outcomes, setOutcomes] = useState<Array<any>>([
    { outcome: "" },
    { outcome: "" },
  ]);

  const handleNewOutcomes = () => {
    const newOutcomes = [...outcomes];
    newOutcomes.push({ outcome: "" });
    setOutcomes(newOutcomes);
  };

  const handleDeleteOutcomes = (index: number) => {
    const newOutcomes = [...outcomes];
    if (newOutcomes.length > 2) {
      newOutcomes.splice(index, 1);
      setOutcomes(newOutcomes);
    }
  };
  const handleOutcomeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const val = e.target.value;
    const list = [...outcomes];
    list[index].outcome = val;
    setOutcomes(list);
  };

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant='h4' color='textSecondary'>
              Oracle Template
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2' className={classes.textSubdued}>
              The oracle template creates an appropriate question based on the
              data of the proposal. We highly recommend using the default Zodiac
              Reality Module template
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          justifyContent='space-between'
          spacing={2}
          alignItems='center'>
          <Grid item xs={6}>
            <Dropdown
              value={template}
              options={[
                { label: "Zodiac Reality Module (default)", value: "default" },
                { label: "Custom", value: "custom" },
              ]}
              onChange={(evt) => setTemplate(evt.target.value as string)}
              disableUnderline
              label='Select template:'
              tooltipMsg='The Zodiac Reality Module type has defaults set for connecting the Reality Module to Safesnap. If you need a more specific setup, use the ‘Custom’ type.'
            />
          </Grid>
          <Grid item xs={6}>
            <Dropdown
              defaultValue='english'
              options={[{ label: "English", value: "english" }]}
              disableUnderline
              label='Language:'
              onChange={(evt) => console.log("evt", evt.target.value)}
            />
          </Grid>
          {template === "custom" && (
            <>
              <Grid item xs={6}>
                <Dropdown
                  value='DAO'
                  options={[{ label: "DAO Proposal", value: "DAO" }]}
                  onChange={(evt) => console.log("evt", evt)}
                  disableUnderline
                  label='Category:'
                  tooltipMsg='This will help categorize the oracle question in reality.eth so it can be found more easily.'
                />
              </Grid>
              <Grid item xs={6}>
                <Dropdown
                  value={templateType}
                  options={[
                    { label: "Bool", value: "bool" },
                    { label: "Multiple Select", value: "multiple" },
                  ]}
                  disableUnderline
                  label='Type:'
                  onChange={(evt) =>
                    setTemplateType(evt.target.value as string)
                  }
                  tooltipMsg='This corresponds with the type of proposal being submitted.'
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'>
                  <Typography>Template question preview:</Typography>

                  <Tooltip title='Provide a custom question here. Use %s as a variable for the proposal id.'>
                    <HelpOutline className={classes.tooltipIcon} />
                  </Tooltip>
                </Grid>

                <ZodiacPaper className={classes.paperTemplateContainer}>
                  <ZodiacTextField
                    className={classes.templateQuestion}
                    multiline
                    rows={5}
                    placeholder={
                      templateType === "multiple"
                        ? CUSTOM_TEMPLATE_QUESTION
                        : TEMPLATE_QUESTION
                    }
                  />
                </ZodiacPaper>
              </Grid>
              {templateType === "multiple" && (
                <Grid item xs={12}>
                  <Typography>Outcomes</Typography>

                  {outcomes.map(({ outcome }, index) => (
                    <Grid container alignItems='center' spacing={1}>
                      <Grid item sm={10}>
                        <ZodiacTextField
                          borderStyle='double'
                          value={outcome}
                          placeholder={`Outcome ${index + 1}`}
                          className={classes.input}
                          onChange={(e) => handleOutcomeInput(e, index)}
                        />
                      </Grid>
                      <Grid item sm={2}>
                        <Button
                          className={classes.button}
                          onClick={() => handleDeleteOutcomes(index)}
                          variant='outlined'
                          startIcon={<Delete />}
                          disabled={index > 1 ? false : true}>
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  ))}

                  <Grid
                    container
                    spacing={1}
                    alignItems='center'
                    className={classes.buttonContainer}
                    onClick={handleNewOutcomes}>
                    <Grid item>
                      <Add className={classes.icon} />
                    </Grid>
                    <Grid item>
                      <Typography
                        color='textSecondary'
                        className={classes.text}>
                        Add another outcome
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
