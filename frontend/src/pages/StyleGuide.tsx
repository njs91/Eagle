import { VFC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Section } from '../components/Default';
import { Page } from '../components/Page';
import { styleGuideMeta } from './MetaTags';
import styles from '../css/default.module.scss';
import guideStyles from '../css//pages/styleGuide.module.scss';

const StyleGuide: VFC = () => (
  <Page meta={styleGuideMeta} fullWidth={true}>
    <Section patterned={true}>
      <h1>Style Guide</h1>
      <h3>Components</h3>
      <h4>Page:</h4>
      <ul>
        <li>
          if fullWidth is true, the outer content backgrounds will span the full
          page width
        </li>
      </ul>
      <h4>Section:</h4>
      <ul>
        <li>
          use for areas that output an outer and inner div where you want to
          control the outer background and inner padding
        </li>
        <li>
          consider using for the majority of the website, passing in a custom
          class if not wanting to use the default styling
        </li>
        <li>
          patterned sections will have alternating background colours (each
          sibling section must pass the patterned prop as true)
        </li>
      </ul>
    </Section>

    <Section patterned={true}>
      <h2>Patterned Sibling Section</h2>
      <p>Will always have different background colours.</p>
    </Section>

    <Section patterned={true}>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p>Paragraph</p>
      <p>
        Lorem ipsum dolor sit amet, no qui natum elitr. Mea te unum mandamus
        philosophia, sea quidam commune no. Pri ullum petentium constituam no,
        mel veri assum meliore cu, vel postea aliquip facilisis et. Habeo
        democritum argumentum eos ei. Commodo voluptatum no sit.
      </p>
      <p>
        Vim mollis adipisci pertinacia{' '}
        <Link to='/test-api'>test internal link</Link> ea{' '}
        <a href='https://google.com' target='_blank' rel='noreferrer'>
          test external link
        </a>{' '}
        fa. Pro dolores atomorum ad, ne movet elitr molestiae qui, per posse
        volumus quaestio an. An sit odio libris principes. Sit suas solet
        corrumpit in, cu mei nominati praesent instructior, nostrud scripserit
        sit ut. Pri cu dicta putent vulputate. Erant graeci utroque mea at, qui
        id simul alterum laoreet.
      </p>
      <p>Unordered List:</p>
      <ul>
        <li>Butter</li>
        <li>Cheese</li>
        <li>Whisky</li>
      </ul>
      <p>Ordered List:</p>
      <ol>
        <li>Butter</li>
        <li>Cheese</li>
        <li>Whisky</li>
      </ol>
      <p>
        Icon Example: <FontAwesomeIcon icon={faCoffee} />
      </p>
      <p>
        Green Check Icon:{' '}
        <FontAwesomeIcon icon={faCheckCircle} className={styles.greenText} />
      </p>
      <p>
        Icons:{' '}
        <a
          href='https://fontawesome.com/v5.15/icons?d=gallery&p=1&m=free'
          target='_blank'
          rel='noreferrer'>
          Font Awesome
        </a>
      </p>
      <p className={guideStyles.testBreakpoints}>
        Test breakpoint style - this paragraph will appear differently at
        different specified breakpoints
      </p>
    </Section>
  </Page>
);

export default StyleGuide;
