import Head from 'next/head'
import ValueComponent from '@components/value'
import ActionInputComponent from '@components/action-input'
import ValueWithActionComponent from '@components/value-with-action'

export default function Home() {
  return (
    <>
      <Head>
        <title>test noval</title>
        <meta name="description" content="test noval || next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center gap-3 h-screen">
        <div className="flex items-center gap-2">
          age: <ValueComponent select="info.age" />
          color: <ValueComponent select="info.color" />
        </div>
        <ActionInputComponent
          // nested 
          callbak={(dispatch, value) => {
            dispatch({ age: value }, "info")
          }} />
        ............................
        <div className="flex flex-col items-center">
          <span>first: <ValueComponent select="first" /></span>
          <span>last: <ValueComponent select="last" /></span>
        </div>
        <ActionInputComponent callbak={(dispatch, value) => {
          const [first, last] = value.split(" ")
          dispatch({ first, last })
          // dispatch("setName", value) if you r use like actions list
        }} />
        <div className="flex items-center gap-2">
          fullname: <ValueComponent
            select={(state) => `${state.first} ${state.last}`}
          />
        </div>
        ............................
        <ValueWithActionComponent />
      </main>
    </>
  )
}