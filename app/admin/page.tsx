'use client';
import {
  Card,
  Metric,
  Text,
  Flex,
  ColGrid,
  Title,
  BarList,
  List,
  ListItem,
  TextInput
} from '@tremor/react';
import { useEffect, useState } from 'react';

const cities = [
  {
    city: 'Athens',
    rating: '2 open PR'
  },
  {
    city: 'Luzern',
    rating: '1 open PR'
  },
  {
    city: 'Zürich',
    rating: '0 open PR'
  },
  {
    city: 'Vienna',
    rating: '1 open PR'
  },
  {
    city: 'Ermatingen',
    rating: '0 open PR'
  },
  {
    city: 'Lisbon',
    rating: '0 open PR'
  },
  {
    city: 'Athens',
    rating: '2 open PR'
  },
  {
    city: 'Luzern',
    rating: '1 open PR'
  },
  {
    city: 'Zürich',
    rating: '0 open PR'
  },
  {
    city: 'Vienna',
    rating: '1 open PR'
  },
  {
    city: 'Ermatingen',
    rating: '0 open PR'
  },
  {
    city: 'Lisbon',
    rating: '0 open PR'
  },
  {
    city: 'Athens',
    rating: '2 open PR'
  },
  {
    city: 'Luzern',
    rating: '1 open PR'
  },
  {
    city: 'Zürich',
    rating: '0 open PR'
  },
  {
    city: 'Vienna',
    rating: '1 open PR'
  },
  {
    city: 'Ermatingen',
    rating: '0 open PR'
  },
  {
    city: 'Lisbon',
    rating: '0 open PR'
  }
];

const website = [
  { name: 'Civil', value: 1230 },
  { name: 'Mechanical', value: 751 },
  { name: 'EE', value: 471 },
  { name: 'ECE', value: 280 },
  { name: 'CSE', value: 78 }
];

const shop = [
  { name: 'Civil', value: 453 },
  { name: 'Mechanical', value: 351 },
  { name: 'EE', value: 271 },
  { name: 'ECE', value: 191 },
  { name: 'CSE', value: 800 }
];

const app = [
  { name: 'Civil', value: 789 },
  { name: 'Mechanical', value: 676 },
  { name: 'EE', value: 564 },
  { name: 'ECE', value: 234 },
  { name: 'CSE', value: 191 }
];

const data = [
  {
    category: 'Transactions this week',
    stat: '10,234',
    data: website
  },
  {
    category: 'Transactions last week',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Transactions 2 weeks ago',
    stat: '2,543',
    data: app
  }
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: 'Total Books',
    metric: '12,699',
    metricPrev: '9,456'
  },
  {
    title: 'Total Users',
    metric: '40,598',
    metricPrev: '45,564'
  },
  {
    title: 'Transactions this week',
    metric: '1,072',
    metricPrev: '856'
  }
];

export default function AdminPage() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookBranch, setBookBranch] = useState('');
  const [bookSemester, setBookSemester] = useState(-1);
  const [bookUrl, setBookUrl] = useState('');
  const [bookUser, setBookUser] = useState(-1);

  const [transactionUser, setTransactionUser] = useState(-1);
  const [transactionBook, setTransactionBook] = useState(-1);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState(-1);
  const [startYear, setStartYear] = useState(-1);
  const [endYear, setEndYear] = useState(-1);
  const [rollNo, setRollNo] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  const [transactionResponse, setTransactionResponse] = useState(null);
  const [bookResponse, setBookResponse] = useState(null);
  const [userResponse, setUserResponse] = useState(null);

  useEffect(() => {
    readDB();
  }, []);

  const readDB = async () => {
    try {
      const transactions = await fetch('/api/transcations', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      setTransactionResponse(await transactions.json());
      const users = await fetch('/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      setUserResponse(await users.json());
      const books = await fetch('/api/books', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      setBookResponse(await books.json());
    } catch (error) {
      console.log('there was an error in fetching', error);
    }
  };

  const handleTransactionSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      userId: transactionUser,
      bookId: transactionBook,
      confirmed: true
    };
    try {
      const response = await fetch('/api/transcations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (response.status !== 200) {
        console.log('something went wrong');
        //set an error banner here
      } else {
        resetTransactionForm();
        readDB();
        console.log('form submitted successfully !!!');
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log('there was an error submitting', error);
    }
  };

  const resetTransactionForm = () => {
    setTransactionUser(-1);
    setTransactionBook(-1);
  };

  const handleUserSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      name,
      username,
      password,
      rollNo,
      startYear,
      endYear,
      semester,
      branch,
      role
    };
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (response.status !== 200) {
        console.log('something went wrong');
        //set an error banner here
      } else {
        resetUserForm();
        readDB();
        console.log('form submitted successfully !!!');
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log('there was an error submitting', error);
    }
  };

  const resetUserForm = () => {
    setName('');
    setUsername('');
    setPassword('');
    setRollNo('');
    setStartYear(-1);
    setEndYear(-1);
    setSemester(-1);
    setBranch('');
    setRole('');
  };

  const handleBookSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      title: bookTitle,
      author: bookAuthor,
      branch: bookBranch,
      semester: bookSemester,
      imageUrl: bookUrl,
      userId: bookUser
    };
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (response.status !== 200) {
        console.log('something went wrong');
        //set an error banner here
      } else {
        resetBookForm();
        readDB();
        console.log('form submitted successfully !!!');
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log('there was an error submitting', error);
    }
  };

  const resetBookForm = () => {
    setBookTitle('');
    setBookAuthor('');
    setBookBranch('');
    setBookSemester(-1);
    setBookUrl('');
    setBookUser(-1);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="items-start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex
              justifyContent="justify-start"
              alignItems="items-baseline"
              spaceX="space-x-3"
              truncate={true}
            >
              <Metric>{item.metric}</Metric>
              <Text truncate={true}>from {item.metricPrev}</Text>
            </Flex>
          </Card>
        ))}
      </ColGrid>
      <ColGrid
        numColsSm={2}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
        marginTop="mt-8"
      >
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="justify-start"
              alignItems="items-baseline"
              spaceX="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total transactions</Text>
            </Flex>
            <Flex marginTop="mt-6">
              <Text>Pages</Text>
              <Text textAlignment="text-right">Transactions</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={dataFormatter}
              marginTop="mt-2"
            />
          </Card>
        ))}
      </ColGrid>
      <div className="max-h-sm">
        <ColGrid
          numColsSm={2}
          numColsLg={3}
          gapX="gap-x-6"
          gapY="gap-y-6"
          marginTop="mt-8"
        >
          <Card maxWidth="max-w-7xl" hFull={false}>
            <Title>Search Users</Title>
            <TextInput placeholder="Search..." />
            <List>
              {cities
                .filter((c) => c.city.startsWith(''))
                .slice(0, 5)
                .map((item) => (
                  <ListItem>
                    <span>{item.city}</span>
                    <span>{item.rating}</span>
                  </ListItem>
                ))}
            </List>
          </Card>
          <Card maxWidth="max-w-7xl" hFull={false}>
            <Title>Search Books</Title>
            <TextInput placeholder="Search..." />
            <List>
              {cities
                .filter((c) => c.city.startsWith(''))
                .slice(0, 5)
                .map((item) => (
                  <ListItem>
                    <span>{item.city}</span>
                    <span>{item.rating}</span>
                  </ListItem>
                ))}
            </List>
          </Card>
          <Card maxWidth="max-w-7xl" hFull={false}>
            <Title>Search Transactions</Title>
            <TextInput placeholder="Search..." />
            <List>
              {cities
                .filter((c) => c.city.startsWith(''))
                .slice(0, 5)
                .map((item) => (
                  <ListItem>
                    <span>{item.city}</span>
                    <span>{item.rating}</span>
                  </ListItem>
                ))}
            </List>
          </Card>
        </ColGrid>
        <div className="mt-10 sm:mt-0 py-4 md:py-10 mx-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Add a Book
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Verify the details properly for best results when searching
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="Title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          onChange={(e) => setBookTitle(e.target.value)}
                          type="text"
                          name="title"
                          id="title"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="Author"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <input
                          onChange={(e) => setBookAuthor(e.target.value)}
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="image-url"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ImageUrl
                        </label>
                        <input
                          onChange={(e) => setBookUrl(e.target.value)}
                          type="text"
                          name="image-urls"
                          id="image-url"
                          autoComplete="image-url"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="user-id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          User ID (Optional)
                        </label>
                        <input
                          onChange={(e) => setBookUser(e.target.valueAsNumber)}
                          type="number"
                          name="user-id"
                          id="user-id"
                          autoComplete="user-id"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="branch"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Branch
                        </label>
                        <input
                          onChange={(e) => setBookBranch(e.target.value)}
                          type="text"
                          name="branch"
                          id="branch"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="semester"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Semester
                        </label>
                        <input
                          onChange={(e) =>
                            setBookSemester(e.target.valueAsNumber)
                          }
                          type="number"
                          name="semester"
                          id="semester"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onSubmit={handleBookSubmit}
                    >
                      Add Book
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0 py-4 md:py-10 mx-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Add a User
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Verify the details properly for best results when searching
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <input
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          name="username"
                          id="username"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          id="password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <input
                          onChange={(e) => setRole(e.target.value)}
                          type="text"
                          name="role"
                          id="role"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="roll no"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Roll No.
                        </label>
                        <input
                          onChange={(e) => setRollNo(e.target.value)}
                          type="text"
                          name="rollno"
                          id="rollno"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="startyear"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Year
                        </label>
                        <input
                          onChange={(e) => setStartYear(e.target.valueAsNumber)}
                          type="number"
                          name="startyear"
                          id="startyear"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <label
                          htmlFor="endyear"
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Year
                        </label>
                        <input
                          onChange={(e) => setEndYear(e.target.valueAsNumber)}
                          type="number"
                          name="endyear"
                          id="endyear"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="branch"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Branch
                        </label>
                        <input
                          onChange={(e) => setBranch(e.target.value)}
                          type="text"
                          name="branch"
                          id="branch"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="semester"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Semester
                        </label>
                        <input
                          onChange={(e) => setSemester(e.target.valueAsNumber)}
                          type="number"
                          name="semester"
                          id="semester"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      onSubmit={handleUserSubmit}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0 py-4 md:py-10 mx-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Add a Transaction
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Verify the details properly for best results when searching
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="user id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          User ID
                        </label>
                        <input
                          onChange={(e) =>
                            setTransactionUser(e.target.valueAsNumber)
                          }
                          type="number"
                          name="user id"
                          id="user ud"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="book id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Book ID
                        </label>
                        <input
                          onChange={(e) =>
                            setTransactionBook(e.target.valueAsNumber)
                          }
                          type="number"
                          name="book id"
                          id="book id"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      onSubmit={handleTransactionSubmit}
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add Transaction
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
