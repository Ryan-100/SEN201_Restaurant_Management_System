**Binary Brains**

Phyo, Grace (Shinn Thant Khin), Ko Sett, Ryan

29 September 2025

SEN-201 (Fall 2025)

## **Comment Rules**

### **1. File Header Comments**

Every source file (.jsx, .js, .tsx, .ts) must include a comment at the
beginning describing:

-   File purpose

-   Author name

-   Creation date

**Example:**

  -----------------------------------------------------------------------
  /\*\
  \* UserProfile.jsx\
  \*\
  \* User profile page component that displays and manages\
  \* user information, including name, email, and preferences.\
  \*\
  \* Created by Aung Sett Paing, 29 September 2025\
  \*/
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **2. Component Documentation**

Every component must be preceded by a block comment explaining:

-   Component purpose

-   Props it accepts (with types and descriptions)

-   Return value/what it renders

**Example:**

  -----------------------------------------------------------------------
  /\*\
  \* Display a user\'s profile information with edit capability\
  \*\
  \* Props:\
  \* userId - string, unique identifier for the user\
  \* isEditable - boolean, whether the profile can be edited\
  \* onSave - function, callback when the save button is clicked\
  \*\
  \* Returns: JSX element containing user profile UI\
  \*/\
  const UserProfile = ({ userId, isEditable, onSave }) =\> {\
  // component logic\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **3. Custom Hook Documentation**

Every custom hook must include documentation explaining:

-   Hook purpose

-   Parameters it accepts

-   Return values and their types

**Example:**

  -----------------------------------------------------------------------
  /\*\
  \* Fetch and manage user data from the API\
  \*\
  \* Parameters:\
  \* userId - string, user identifier to fetch\
  \*\
  \* Returns:\
  \* user - object, user data or null\
  \* loading - boolean, loading state\
  \* error - string, error message if fetch fails\
  \*/\
  const useUser = (userId) =\> {\
  // hook logic\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **4. Complex Logic Comments**

Use comments only when code logic is not self-explanatory. Comments
should explain **why** something is done, not **what** is being done.

**Good:**

  -----------------------------------------------------------------------
  // Debounce search to avoid excessive API calls\
  const debouncedSearch = useCallback(\
  debounce((query) =\> fetchResults(query), 300),\
  \[\]\
  );
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

**Avoid:**

  -----------------------------------------------------------------------
  // Set count to count plus 1\
  setCount(count + 1);
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **5. Comment Style**

Use JavaScript single-line (//) or multi-line (/\* \*/) comments
consistently throughout your project.

## **Naming Rules**

### **1. Components**

-   Use **PascalCase** for component names.

-   Names should clearly describe what the component does.

**Example:**

  -----------------------------------------------------------------------
  const UserProfile = () =\> {};\
  const NavigationBar = () =\> {};\
  const ShoppingCart = () =\> {};
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **2. Variables & Functions**

-   Use **camelCase** for variables, functions, and hooks.

-   Function names should start with **verbs**.

-   Names should be meaningful and descriptive.

**Example:**

  -----------------------------------------------------------------------
  const userName = \"John\";\
  const isLoading = false;\
  const fetchUserData = async () =\> {};\
  const handleButtonClick = () =\> {};
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **3. Constants**

-   Use **UPPERCASE** with underscores for constants

-   Apply to configuration values and unchanging values

**Example:**

  -----------------------------------------------------------------------
  const MAX_RETRY_ATTEMPTS = 3;\
  const DEFAULT_PAGE_SIZE = 20;
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **4. Custom Hooks**

-   Always start with **use** prefix

-   Use **camelCase** for the rest of the name

**Example:**

  -----------------------------------------------------------------------
  const useAuth = () =\> {};\
  const useLocalStorage = () =\> {};\
  const useFetchData = () =\> {};
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **5. Event Handlers**

-   Always start with **handle** prefix for event handle functions

-   Use descriptive names that indicate the action

**Example:**

  -----------------------------------------------------------------------
  const handleSubmit = () =\> {};\
  const handleInputChange = () =\> {};\
  const handleDeleteUser = () =\> {};
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **6. Booleans**

-   Start the name with **is**, **has**, **should**, or **can** prefix

**Example:**

  -----------------------------------------------------------------------
  const isLoading = false;\
  const hasError = true;\
  const shouldRender = true;\
  const canEdit = false;
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **7. Avoid Single Letters**

-   Avoid single-letter variable names except:

    -   Loop indices: i, j, k

    -   Common abbreviations: e for event and x and y for coordinates

### **8. File Naming**

-   **Components:** PascalCase (e.g., UserProfile.jsx)

-   **Utilities/helpers:** camelCase (e.g.,
    > [[formatDate.js]{.underline}](http://formatdate.js))

-   **Hooks: use** + camelCase (e.g.,
    > [[useAuth.js]{.underline}](http://useauth.js))

-   **Styles (CSS Modules):** PascalCase to match component (e.g.,
    > UserProfile.css)

## **Code Format Rules**

### **1. Indentation**

-   Use **2 spaces** for indentation (standard React convention)

-   Maintain consistent indentation to show logical structure

**Example:**

  -----------------------------------------------------------------------
  const MyComponent = () =\> {\
  const \[count, setCount\] = useState(0);\
  \
  if (count \> 0) {\
  return (\
  \<**div**\>\
  \<**p**\>Count: {count}\</**p**\>\
  \</**div**\>\
  );\
  }\
  \
  return null;\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **2. Curly Braces**

-   Place opening brace on the **same line** as function declaration

-   Place closing brace on a **new line** aligned with function
    > declaration

**Example:**

  -----------------------------------------------------------------------
  const add = (a, b) =\> {\
  return a + b;\
  };\
  \
  const UserCard = ({ user }) =\> {\
  return (\
  \<**div**\>\
  {/\* component content \*/}\
  \</**div**\>\
  );\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **3. JSX Formatting**

-   Use parentheses for multi-line JSX returns

-   Close self-closing tags with space before /\>

-   Keep attributes on separate lines if there are more than 2

**Good:**

  -----------------------------------------------------------------------
  return (\
  \<**div** className=\"container\"\>\
  \<**Button**\
  onClick={handleClick}\
  disabled={isLoading}\
  variant=\"primary\"\
  \>\
  Submit\
  \</**Button**\>\
  \</**div**\>\
  );
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

**Avoid:**

  -----------------------------------------------------------------------
  return (\
  \<**div** className=\"container\"\>\
  \<**Button** onClick={handleClick}\
  disabled={isLoading}\
  variant=\"primary\" \>\
  Submit\</**Button**\>\</**div**\>);
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **4. Line Length**

-   Keep lines under **80-100 characters**

-   Break long lines for better readability

**Example:**

  -----------------------------------------------------------------------
  // Break long function calls\
  const result = calculateComplexValue(\
  firstParameter,\
  secondParameter,\
  thirdParameter\
  );\
  \
  // Break long JSX attributes\
  \<Component\
  propertyOne=\"value\"\
  propertyTwo={someValue}\
  propertyThree={anotherValue}\
  /\>
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **5. File Length**

-   Maximum 300 lines per file

-   If a file exceeds 300 lines, extract components or logic into
    > separate files

### **6. Blank Lines**

-   Use blank lines to separate logical sections

-   One blank line between function definitions

-   One blank line between import groups

**Example:**

  -----------------------------------------------------------------------
  import React, { useState, useEffect } from \'react\';\
  \
  import { Button } from \'../UI/Button\';\
  import { formatDate } from \'../utils/dateUtils\';\
  \
  const MyComponent = () =\> {\
  const \[data, setData\] = useState(null);\
  \
  useEffect(() =\> {\
  // effect logic\
  }, \[\]);\
  \
  const handleClick = () =\> {\
  // handler logic\
  };\
  \
  return (\
  \<**div**\>\
  {/\* JSX \*/}\
  \</**div**\>\
  );\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

## **Component Rules**

### **1. Functional Components Only**

-   Use functional components exclusively

-   No class components allowed

**Correct:**

  -----------------------------------------------------------------------
  const MyComponent = () =\> {\
  return \<**div**\>Hello\</**div**\>;\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

**Incorrect:**

  -----------------------------------------------------------------------
  class MyComponent extends React.Component {\
  render() {\
  return \<**div**\>Hello\</**div**\>;\
  }\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **2. Arrow Functions**

-   Use **arrow function syntax** for all components and functions

**Example:**

  -----------------------------------------------------------------------
  const Button = ({ onClick, children }) =\> {\
  return (\
  \<**button** onClick={onClick}\>\
  {children}\
  \</**button**\>\
  );\
  };\
  \
  const handleSubmit = () =\> {\
  // logic\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **3. Component Structure Order**

Organize component code in this order:

1.  Imports

2.  Component definition

3.  Props destructuring

4.  Hooks (useState, useEffect, custom hooks)

5.  Event handlers

6.  Helper functions

7.  Return statement (JSX)

**Example:**

  -----------------------------------------------------------------------
  import React, { useState, useEffect } from \'react\';\
  import { useAuth } from \'../hooks/useAuth\';\
  \
  const UserDashboard = ({ userId }) =\> {\
  // Hooks\
  const \[user, setUser\] = useState(null);\
  const { isAuthenticated } = useAuth();\
  \
  useEffect(() =\> {\
  fetchUser();\
  }, \[userId\]);\
  \
  // Event handlers\
  const handleUpdate = () =\> {\
  // logic\
  };\
  \
  // Helper functions\
  const fetchUser = async () =\> {\
  // logic\
  };\
  \
  // Return JSX\
  return (\
  \<**div**\>\
  {/\* component UI \*/}\
  \</**div**\>\
  );\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **4. Props Destructuring**

-   Destructure props in function parameters when possible

-   Use default values for optional props

**Example:**

  -----------------------------------------------------------------------
  const Button = ({\
  onClick,\
  children,\
  disabled = false,\
  variant = \'primary\'\
  }) =\> {\
  return (\
  \<**button** onClick={onClick} disabled={disabled}\>\
  {children}\
  \</**button**\>\
  );\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **5. Conditional Rendering**

Use clear, readable patterns for conditional rendering:

**Example:**

  -----------------------------------------------------------------------
  // For simple conditions\
  {isLoading && \<**Spinner** /\>}\
  \
  // For if-else conditions\
  {isError ? \<**ErrorMessage** /\> : \<**Content** /\>}\
  \
  // For complex conditions, extract to variable\
  const content = (() =\> {\
  if (isLoading) return \<**Spinner** /\>;\
  if (isError) return \<**ErrorMessage** /\>;\
  return \<**Content** /\>;\
  })();\
  \
  return \<**div**\>{content}\</**div**\>;
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

## **Project Structure Rules**

### **1. Folder Organization**

Follow this required folder structure:

![](media/image1.png){width="6.5in" height="2.0416666666666665in"}

### **2. Folder Purpose**

**hooks/**

-   Custom React hooks only

-   File naming: useHookName.js

**components/**

-   Reusable business logic components

-   Feature-specific components

**utils/**

-   Pure JavaScript utility functions

-   No React-specific code

-   Examples: date formatting, validation, API calls

**layout/**

-   Layout wrapper components

-   Examples: Sidebar.jsx, Header.jsx, Footer.jsx

**pages/**

-   Top-level route components

-   Examples: Home.jsx, Profile.jsx, Dashboard.jsx

**UI/**

-   Basic, reusable UI elements

-   Examples: Button.jsx, Input.jsx, Card.jsx

### **3. File Organization**

-   One component per file

-   File name must match component name

-   Export component at bottom of file

**Example:**

  -----------------------------------------------------------------------
  // Button.jsx\
  const Button = ({ children, onClick }) =\> {\
  return (\
  \<**button** onClick={onClick}\>\
  {children}\
  \</**button**\>\
  );\
  };\
  \
  export default Button;
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

## **Coding Best Practices**

### **1. DRY Principle (Don\'t Repeat Yourself)**

-   Extract repeated code into reusable components or functions

-   Use custom hooks for repeated stateful logic

-   Create utility functions for repeated operations

**Bad:**

  -----------------------------------------------------------------------
  const ComponentA = () =\> {\
  const formatDate = (date) =\> {\
  return new Date(date).toLocaleDateString();\
  };\
  // \...\
  };\
  \
  const ComponentB = () =\> {\
  const formatDate = (date) =\> {\
  return new Date(date).toLocaleDateString();\
  };\
  // \...\
  };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

**Good:**

  -----------------------------------------------------------------------
  // utils/dateUtils.js\
  export const formatDate = (date) =\> {\
  return new Date(date).toLocaleDateString();\
  };\
  \
  // ComponentA.jsx and ComponentB.jsx\
  import { formatDate } from \'../utils/dateUtils\';
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **2. State Management**

-   Keep state as close to where it\'s used as possible

-   Lift state up only when necessary

-   Use appropriate hooks for different scenarios

**Example:**

  -----------------------------------------------------------------------
  // Use useState for simple state\
  const \[count, setCount\] = useState(0);\
  \
  // Use useReducer for complex state logic\
  const \[state, dispatch\] = useReducer(reducer, initialState);\
  \
  // Use context for global state\
  const { user, setUser } = useContext(UserContext);
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **3. Effect Dependencies**

-   Always include all dependencies in useEffect dependency array

-   Use ESLint to catch missing dependencies

**Example:**

  -----------------------------------------------------------------------
  useEffect(() =\> {\
  fetchUser(userId);\
  }, \[userId\]); // Include all dependencies
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **4. Key Props in Lists**

-   Always provide unique key prop when rendering lists

-   Never use array index as key if list can be reordered

**Good:**

  -----------------------------------------------------------------------
  {users.map(user =\> (\
  \<**UserCard** key={user.id} user={user} /\>\
  ))}
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

**Bad:**

  -----------------------------------------------------------------------
  {users.map((user, index) =\> (\
  \<**UserCard** key={index} user={user} /\>\
  ))}
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### 

### **5. Error Handling**

-   ### Implement error boundaries for component errors

-   ### Handle async errors gracefully

-   ### Provide user feedback for errors

### **Example:**

  -----------------------------------------------------------------------
  const \[error, setError\] = useState(null);\
  \
  const fetchData = async () =\> {\
  try {\
  const response = await api.getData();\
  setData(response);\
  } catch (err) {\
  setError(\'Failed to load data\');\
  }\
  };\
  \
  return (\
  \<**div**\>\
  {error && \<**ErrorMessage** message={error} /\>}\
  {/\* other content \*/}\
  \</**div**\>\
  );
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

## **Environment Requirements**

### **Node Version**

-   ### Minimum Node.js version: **22.0.0 or higher**

-   ### Verify version with: node \--version

### **Package Management**

-   ### Use npm only consistently

-   ### Commit package-lock.json 

## **Import Rules**

### **1. Import Organization**

Group imports in this order with blank lines between groups:

1.  React imports

2.  Third-party library imports

3.  Internal imports (hooks, components, utils)

4.  Style imports

**Example:**

  -----------------------------------------------------------------------
  import React, { useState, useEffect } from \'react\';\
  \
  import axios from \'axios\';\
  import { Route, Routes } from \'react-router-dom\';\
  \
  import { useAuth } from \'../hooks/useAuth\';\
  import { Button } from \'../UI/Button\';\
  import { formatDate } from \'../utils/dateUtils\';\
  \
  import \'./styles.css\';
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

### **2. Named vs Default Exports**

-   Use **default export** for components

-   Use **named exports** for utilities and helpers

**Example:**

  -----------------------------------------------------------------------
  // Component (default export)\
  const Button = () =\> { };\
  export default Button;\
  \
  // Utils (named exports)\
  export const formatDate = () =\> { };\
  export const calculateTotal = () =\> { };
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

## **Summary**

Following these standards will:

-   Make our code more readable and maintainable

-   Help us write consistent, professional React applications

-   Prepare us for real-world development practices

-   Ensure smooth collaboration in our team project.
